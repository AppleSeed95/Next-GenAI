"use-client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@kit/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@kit/ui/form";
import { Button } from "@kit/ui/button";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

export const formSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size !== 0, "Please upload an image"),
});
interface LogoUploaderProps {
    onChange: (file: File) => void;
    loading: boolean | null;
}
export const LogoUploader: React.FC<LogoUploaderProps> = ({ onChange, loading }: LogoUploaderProps) => {
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            image: new File([""], "filename"),
        },
    });

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0] ?? new File([""], "filename"));
                form.setValue("image", acceptedFiles[0] ?? new File([""], "filename"));
                form.clearErrors("image");
            } catch (error) {
                setPreview(null);
                form.resetField("image");
            }
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 1000000,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onChange(values.image)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border-none">
                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem className="mx-auto w-[300px] text-center border-none">
                            <FormLabel
                                className={`${fileRejections.length !== 0 && "text-destructive"
                                    }`}
                            >
                                <h2 className="text-xl font-semibold tracking-tight">
                                    <span
                                        className={
                                            form.formState.errors.image || fileRejections.length !== 0
                                                ? "text-destructive"
                                                : "text-muted-foreground"
                                        }
                                    ></span>
                                </h2>
                            </FormLabel>
                            <FormControl>
                                <div
                                    {...getRootProps()}
                                    className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-slate-700 border-dashed p-8"
                                >
                                    {preview && (
                                        <img
                                            src={preview as string}
                                            alt="Uploaded image"
                                            className="max-h-[400px] rounded-lg"
                                        />
                                    )}
                                    <ImagePlus
                                        className={`w-[40px] h-[40px] ${preview ? "hidden" : "block"}`}
                                    />
                                    <Input {...getInputProps()} type="file" />
                                    {isDragActive ? (
                                        <p className="text-sm text-slate-300">Drop the image!</p>
                                    ) : (
                                        <p className="text-sm text-slate-300">Click here or drag an image to apply logo</p>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage>
                                {fileRejections.length !== 0 && (
                                    <p>
                                        Image must be less than 1MB and of type png, jpg, or jpeg
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || loading === true}
                    className="mx-auto block h-auto rounded-lg"
                >
                    Apply
                </Button>
            </form>
        </Form>
    );
};