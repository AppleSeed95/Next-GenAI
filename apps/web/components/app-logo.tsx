import Link from 'next/link';

import { cn } from '@kit/ui/utils';

function LogoImage({
  className,
  width = 105,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      width={width}
      className={cn(`w-[95px]`, className)}
      viewBox="0 0 733 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={'fill-primary dark:fill-white'}
        d="M119.081 138V73.209C119.081 67.551 117.08 62.79 113.078 58.926C109.214 55.062 104.453 53.13 98.7951 53.13C93.2751 53.13 88.4451 55.062 84.3051 58.926C80.3031 62.652 78.3021 67.344 78.3021 73.002V138H59.4651V73.002C59.4651 67.206 57.5331 62.514 53.6691 58.926C49.5291 55.062 44.6301 53.13 38.9721 53.13C33.4521 53.13 28.7601 55.062 24.8961 58.926C20.7561 63.066 18.6861 67.965 18.6861 73.623V138H0.0560548V36.984H18.6861V44.643C21.0321 41.745 24.0681 39.33 27.7941 37.398C31.6581 35.466 35.3841 34.5 38.9721 34.5C45.0441 34.5 50.5641 35.742 55.5321 38.226C60.6381 40.572 65.0541 43.884 68.7801 48.162C72.5061 43.884 76.9221 40.572 82.0281 38.226C87.1341 35.742 92.7231 34.5 98.7951 34.5C104.177 34.5 109.214 35.466 113.906 37.398C118.598 39.33 122.738 42.09 126.326 45.678C129.914 49.266 132.674 53.475 134.606 58.305C136.676 62.997 137.711 67.965 137.711 73.209V138H119.081ZM242.173 138V122.268C237.757 127.374 232.651 131.445 226.855 134.481C221.059 137.517 214.918 139.035 208.432 139.035C201.256 139.035 194.494 137.724 188.146 135.102C181.936 132.48 176.416 128.754 171.586 123.924C166.756 119.232 162.961 113.712 160.201 107.364C157.579 100.878 156.268 94.116 156.268 87.078C156.268 80.04 157.579 73.347 160.201 66.999C162.961 60.513 166.756 54.855 171.586 50.025C176.416 45.195 181.936 41.469 188.146 38.847C194.494 36.225 201.256 34.914 208.432 34.914C215.056 34.914 221.266 36.294 227.062 39.054C232.996 41.814 238.033 45.678 242.173 50.646V36.984H260.803V138H242.173ZM208.432 53.337C203.878 53.337 199.462 54.234 195.184 56.028C191.044 57.684 187.456 60.03 184.42 63.066C181.384 66.102 178.969 69.759 177.175 74.037C175.519 78.177 174.691 82.524 174.691 87.078C174.691 91.632 175.519 95.979 177.175 100.119C178.969 104.259 181.384 107.847 184.42 110.883C187.456 113.919 191.044 116.334 195.184 118.128C199.462 119.784 203.878 120.612 208.432 120.612C212.986 120.612 217.333 119.784 221.473 118.128C225.613 116.334 229.201 113.919 232.237 110.883C235.273 107.847 237.619 104.259 239.275 100.119C241.069 95.979 241.966 91.632 241.966 87.078C241.966 82.524 241.069 78.177 239.275 74.037C237.619 69.759 235.273 66.102 232.237 63.066C229.201 60.03 225.613 57.684 221.473 56.028C217.333 54.234 212.986 53.337 208.432 53.337ZM331.127 138L299.663 99.705V138H281.447V0.344996H299.663V59.754L327.815 33.258H354.932L305.873 78.798L355.139 138H331.127ZM379.299 94.116C379.299 97.428 380.472 100.878 382.818 104.466C385.302 108.054 388.131 111.09 391.305 113.574C397.101 118.128 403.863 120.405 411.591 120.405C423.873 120.405 433.878 114.471 441.606 102.603L457.338 111.918C451.956 120.612 445.332 127.305 437.466 131.997C429.6 136.689 420.975 139.035 411.591 139.035C404.553 139.035 397.86 137.724 391.512 135.102C385.164 132.342 379.575 128.547 374.745 123.717C369.915 118.887 366.12 113.298 363.36 106.95C360.738 100.602 359.427 93.909 359.427 86.871C359.427 79.833 360.738 73.14 363.36 66.792C366.12 60.306 369.915 54.648 374.745 49.818C379.437 44.988 384.957 41.262 391.305 38.64C397.791 36.018 404.553 34.707 411.591 34.707C418.629 34.707 425.322 36.018 431.67 38.64C438.156 41.262 443.745 44.988 448.437 49.818C458.649 60.306 463.755 72.45 463.755 86.25C463.755 88.734 463.548 91.356 463.134 94.116H379.299ZM411.591 51.681C405.933 51.681 400.62 52.923 395.652 55.407C390.684 57.891 386.682 61.203 383.646 65.343C380.748 69.345 379.299 73.623 379.299 78.177H443.883C443.883 73.623 442.365 69.345 439.329 65.343C436.431 61.203 432.498 57.891 427.53 55.407C422.562 52.923 417.249 51.681 411.591 51.681ZM528.543 54.372C525.231 52.854 522.264 52.095 519.642 52.095C514.122 52.095 509.568 54.027 505.98 57.891C502.116 62.031 500.184 66.792 500.184 72.174V138H482.382V72.174C482.382 64.722 484.245 57.891 487.971 51.681C491.835 45.471 497.079 40.641 503.703 37.191C508.671 34.845 513.984 33.672 519.642 33.672C524.196 33.672 528.543 34.5 532.683 36.156C536.823 37.812 541.17 40.503 545.724 44.229L528.543 54.372ZM610.092 138L578.628 99.705V138H560.412V0.344996H578.628V59.754L606.78 33.258H633.897L584.838 78.798L634.104 138H610.092ZM656.049 19.596C653.427 19.596 651.15 18.699 649.218 16.905C647.424 14.973 646.527 12.696 646.527 10.074C646.527 7.45199 647.424 5.24399 649.218 3.44999C651.15 1.51799 653.427 0.551993 656.049 0.551993C658.671 0.551993 660.879 1.51799 662.673 3.44999C664.605 5.24399 665.571 7.45199 665.571 10.074C665.571 12.696 664.605 14.973 662.673 16.905C660.879 18.699 658.671 19.596 656.049 19.596ZM647.562 138V34.5H664.95V138H647.562ZM717.4 53.13V138H699.805V53.13H684.28V34.5H699.805V0.344996H717.4V34.5H732.925V53.13H717.4Z"
        fill="url(#paint0_linear_1666_2)"
      />
    </svg>
    // <svg width="100%" height="100%" viewBox="0 0 603 141" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" className="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    //   <g transform="matrix(1,0,0,1,-96.4368,-59.956)">
    //     <g transform="matrix(0.548945,0,0,0.548945,62.7917,33.7995)">
    //       <path d="M265,140.6C265,118.192 246.808,100 224.4,100L102.6,100C80.192,100 62,118.192 62,140.6L62,262.4C62,284.808 80.192,303 102.6,303L224.4,303C246.808,303 265,284.808 265,262.4L265,140.6Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-24.9552)">
    //       <path d="M559.37,206.517C564.893,206.517 569.37,210.994 569.37,216.517C569.37,222.04 564.893,226.517 559.37,226.517C553.847,226.517 549.37,222.04 549.37,216.517C549.37,210.994 553.847,206.517 559.37,206.517ZM564.37,176.196C564.37,176.196 554.37,175.048 554.37,176.705L554.37,197.175C545.74,199.409 539.344,207.251 539.37,216.575C539.4,227.057 547.803,235.924 558.27,236.487C569.795,237.108 579.37,227.91 579.37,216.517C579.37,207.218 572.982,199.404 564.37,197.175L564.37,176.196Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.801696,0,0,0.801696,7.03627,23.7566)">
    //       <path d="M194,81L202,81" className="fill:none;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-32.9721)">
    //       <path d="M469.537,287.6L452.287,287.6L452.287,297.6L465.703,297.6C467.36,297.6 468.703,298.944 468.703,300.6L468.703,358.691C471.978,359.825 475.312,362.076 478.703,362.939L478.703,296.767C478.703,291.704 474.599,287.6 469.537,287.6Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-32.9721)">
    //       <path d="M543.537,297.85C538.014,297.85 533.537,293.373 533.537,287.85C533.537,282.328 538.014,277.85 543.537,277.85C549.06,277.85 553.537,282.328 553.537,287.85C553.537,293.373 549.06,297.85 543.537,297.85ZM605.037,240.684L605.037,279.85C605.037,281.507 603.694,282.85 602.037,282.85L562.879,282.85C560.645,274.221 552.803,267.824 543.479,267.85C532.997,267.88 524.13,276.283 523.565,286.75C522.945,298.276 532.144,307.85 543.537,307.85C552.836,307.85 560.65,301.462 562.879,292.85L605.87,292.85C610.933,292.85 615.037,288.746 615.037,283.684L615.037,244.517C615.037,242.86 616.38,241.517 618.037,241.517L625.574,241.517L625.71,231.517L614.203,231.517C609.141,231.517 605.037,235.621 605.037,240.684Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-35.3772)">
    //       <path d="M513.037,343.767C507.514,343.767 503.037,339.29 503.037,333.767C503.037,328.244 507.514,323.767 513.037,323.767C518.56,323.767 523.037,328.244 523.037,333.767C523.037,339.29 518.56,343.767 513.037,343.767ZM533.037,333.767C533.037,322.739 524.065,313.767 513.037,313.767C502.008,313.767 493.037,322.739 493.037,333.767C493.037,343.066 499.425,350.88 508.037,353.109L508.037,366.776C508.565,366.783 509.091,366.796 509.62,366.796C512.448,366.796 515.254,366.693 518.037,366.508L518.037,353.109C526.648,350.88 533.037,343.066 533.037,333.767Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.601272,0,0,0.601272,69.5686,72.4596)">
    //       <circle cx="180" cy="195" r="8" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-201.322,-36.1789)">
    //       <path d="M568.537,323.767C563.474,323.767 559.37,327.871 559.37,332.934L559.37,367.707C562.784,366.224 566.122,368.336 569.37,366.565L569.37,336.767C569.37,335.11 570.713,333.767 572.37,333.767L636.493,333.767L637.073,323.767L568.537,323.767Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(-0.643495,7.88054e-17,-7.88054e-17,-0.643495,498,351.252)">
    //       <path d="M568.537,323.767C563.474,323.767 559.37,327.871 559.37,332.934L559.37,408.82L569.37,408.924L569.37,336.767C569.37,335.11 570.713,333.767 572.37,333.767L624.034,333.767C624.034,333.767 623.368,323.767 623.368,323.767L568.537,323.767Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-25.7569)">
    //       <path d="M589.953,198.1C589.953,203.163 594.057,207.267 599.12,207.267L626.932,207.267C625.676,203.861 624.271,200.527 622.734,197.267L602.953,197.267C601.297,197.267 599.953,195.924 599.953,194.267L599.953,179.07L589.953,175.935L589.953,198.1Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,54.4501)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,48.0365)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,41.6229)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,35.2094)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.66808,0,0,2.17603,96.8262,-91.4586)">
    //       <path d="M168,128.75C168,127.784 165.446,127 162.3,127L143.7,127C140.554,127 138,127.784 138,128.75L138,132.25C138,133.216 140.554,134 143.7,134L162.3,134C165.446,134 168,133.216 168,132.25L168,128.75Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.801696,0,0,0.801696,7.03627,23.7566)">
    //       <rect x="227" y="214" width="8" height="6" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M191.037,413.008L172.191,457.322C172.078,457.55 171.963,457.892 171.735,458.235C171.735,458.349 171.621,458.349 171.621,458.349C171.507,458.578 171.278,458.806 171.05,459.035C170.936,459.149 170.822,459.149 170.822,459.149C170.593,459.378 170.365,459.606 170.136,459.72C170.136,459.833 170.021,459.833 170.021,459.948C169.679,460.177 169.451,460.405 168.994,460.519C168.994,460.519 168.88,460.519 168.88,460.633C168.651,460.633 168.309,460.747 167.967,460.862L167.738,460.862C167.394,460.976 167.052,460.976 166.595,460.976C166.252,460.976 165.909,460.976 165.568,460.862L165.339,460.862C165.11,460.748 164.882,460.633 164.539,460.633L164.425,460.519L164.311,460.519C163.968,460.405 163.626,460.176 163.283,459.833L163.283,459.72C162.941,459.606 162.826,459.377 162.597,459.149C162.597,459.149 162.369,459.149 162.369,459.035C162.14,458.806 161.912,458.578 161.798,458.349C161.798,458.349 161.684,458.349 161.684,458.235C161.455,457.892 161.341,457.549 161.227,457.322L152.89,437.563L144.781,457.322C144.667,457.55 144.438,457.892 144.21,458.235L144.21,458.349C143.982,458.578 143.754,458.806 143.525,459.035C143.525,459.149 143.41,459.149 143.41,459.149C143.181,459.378 142.953,459.606 142.725,459.834C142.268,460.177 142.039,460.405 141.697,460.52L141.468,460.52C141.468,460.52 141.355,460.52 141.355,460.634C141.126,460.634 140.783,460.748 140.669,460.863L140.44,460.863C139.983,460.977 139.64,460.977 139.297,460.977C138.84,460.977 138.498,460.977 138.155,460.863L137.813,460.863C137.584,460.749 137.356,460.634 137.127,460.634C137.013,460.52 137.013,460.52 136.898,460.52C136.556,460.406 136.099,460.177 135.87,459.834C135.756,459.834 135.756,459.834 135.756,459.721C135.642,459.607 135.414,459.378 135.071,459.15L134.842,459.036C134.728,458.807 134.499,458.579 134.385,458.35C134.271,458.35 134.271,458.35 134.271,458.236C134.042,457.893 133.928,457.55 133.7,457.323L114.969,413.009C113.599,409.925 115.083,406.498 118.282,405.128C121.023,403.871 124.564,405.242 125.82,408.555L139.297,439.278L147.292,420.205C148.32,417.921 150.49,416.55 152.889,416.55C155.401,416.55 157.571,417.921 158.485,420.205L166.594,439.278L180.071,408.555C181.214,405.242 184.868,403.871 187.723,405.128C190.809,406.497 192.408,409.924 191.037,413.008Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M365.324,387.195C365.324,383.883 368.064,381.028 371.605,381.028C375.031,381.028 377.773,383.883 377.773,387.195" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M390.678,452.639C385.768,447.614 382.797,440.533 382.797,432.538C382.797,424.771 385.768,418.033 390.678,412.551C395.817,407.183 402.442,403.87 410.323,403.87C417.86,403.87 424.714,407.183 429.397,412.551C434.536,418.033 437.391,424.772 437.391,432.538C437.391,440.532 434.536,447.613 429.397,452.639C424.713,458.007 417.86,461.32 410.323,461.32C402.441,461.319 395.816,458.007 390.678,452.639ZM395.246,432.538C395.246,437.449 396.73,441.446 399.357,444.644C402.212,447.385 405.982,448.87 410.322,448.87C414.32,448.87 417.974,447.386 420.83,444.644C423.685,441.446 425.283,437.449 425.283,432.538C425.283,427.855 423.685,423.743 420.83,420.66C417.975,418.147 414.32,416.319 410.322,416.319C405.982,416.319 402.213,418.147 399.357,420.66C396.73,423.743 395.246,427.855 395.246,432.538Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M434.648,452.639C429.738,447.614 426.769,440.533 426.769,432.538C426.769,424.771 429.738,418.033 434.648,412.551C439.789,407.183 446.414,403.87 454.293,403.87C461.832,403.87 468.686,407.183 473.367,412.551C478.506,418.033 481.361,424.772 481.361,432.538C481.361,440.532 478.506,447.613 473.367,452.639C468.685,458.007 461.832,461.32 454.293,461.32C446.414,461.319 439.789,458.007 434.648,452.639ZM439.219,432.538C439.219,437.449 440.703,441.446 443.33,444.644C446.185,447.385 449.953,448.87 454.293,448.87C458.291,448.87 461.945,447.386 464.801,444.644C467.656,441.446 469.256,437.449 469.256,432.538C469.256,427.855 467.656,423.743 464.801,420.66C461.946,418.147 458.291,416.319 454.293,416.319C449.953,416.319 446.186,418.147 443.33,420.66C440.703,423.743 439.219,427.855 439.219,432.538Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M293.466,404.213C306.487,404.213 317.223,414.949 317.223,427.969L317.223,455.266C317.223,458.464 314.482,461.32 311.169,461.32C307.743,461.32 305.116,458.465 305.116,455.266L305.116,427.969C305.116,421.459 299.976,416.32 293.466,416.32C286.843,416.32 281.589,421.46 281.474,427.969L281.474,455.266C281.474,458.464 278.962,461.32 275.536,461.32C272.338,461.32 269.369,458.465 269.369,455.266L269.369,427.969C269.368,414.95 280.331,404.213 293.466,404.213Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M257.716,404.213C270.737,404.213 281.473,414.949 281.473,427.969L281.473,455.266C281.473,458.464 278.732,461.32 275.419,461.32C271.993,461.32 269.366,458.465 269.366,455.266L269.366,427.969C269.366,421.459 264.226,416.32 257.716,416.32C251.093,416.32 245.839,421.46 245.724,427.969L245.724,434.266C245.724,437.464 243.212,440.32 239.786,440.32C236.588,440.32 233.619,458.465 233.619,455.266L233.619,427.969C233.618,414.95 244.581,404.213 257.716,404.213Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M221.41,461.319C208.389,461.319 197.653,450.583 197.653,437.563L197.653,410.266C197.653,407.068 200.394,404.212 203.707,404.212C207.133,404.212 209.76,407.067 209.76,410.266L209.76,437.563C209.76,444.073 214.9,449.212 221.41,449.212C228.033,449.212 233.287,444.072 233.402,437.563L233.402,428.266C233.402,425.068 235.914,414.212 239.34,414.212C242.538,414.212 245.507,407.067 245.507,410.266L245.507,437.563C245.508,450.582 234.545,461.319 221.41,461.319Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M331.061,453.435C326.151,448.41 323.18,441.329 323.18,433.334C323.18,425.567 326.151,418.829 331.061,413.347C336.2,407.979 342.825,404.666 350.706,404.666C358.243,404.666 365.097,407.979 369.78,413.347C374.919,418.829 377.774,425.568 377.774,433.334C377.774,441.328 374.919,448.409 369.78,453.435C365.096,458.803 358.243,462.116 350.706,462.116C342.824,462.115 336.199,458.803 331.061,453.435ZM335.629,433.334C335.629,438.245 337.113,442.242 339.74,445.44C342.595,448.181 346.365,449.666 350.705,449.666C354.703,449.666 358.357,448.182 361.213,445.44C364.068,442.242 365.666,438.245 365.666,433.334C365.666,428.651 364.068,424.539 361.213,421.456C358.358,418.943 354.703,417.115 350.705,417.115C346.365,417.115 342.596,418.943 339.74,421.456C337.113,424.539 335.629,428.651 335.629,433.334Z" className="fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <rect x="365.324" y="387.195" width="12.449" height="44.281" />
    //     </g>
    //     <g transform="matrix(1,0,0,1,-399,-268)">
    //       <g transform="matrix(34,0,0,34,1099.69,467.134)">
    //       </g>
    //       <text x="653.271px" y="467.134px" className="font-family:'Nunito-Bold', 'Nunito';font-weight:700;font-size:34px;">A<tspan x="678.662px 690.423px 700.939px 724.604px 752.352px 779.404px 800.395px 822.267px 849.318px 870.31px 880.826px 906.732px 928.603px 955.655px 977.526px 1002.05px 1027.44px 1048.44px 1076.18px " y="467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px ">I CONTENT GENERATOR</tspan></text>
    //     </g>
    //   </g>
    // </svg>
    // <svg width="100%" height="100%" viewBox="0 0 603 141" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" className="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    //   <g transform="matrix(1,0,0,1,-96.4368,-59.956)">
    //     <g transform="matrix(0.548945,0,0,0.548945,62.7917,33.7995)">
    //       <path d="M265,140.6C265,118.192 246.808,100 224.4,100L102.6,100C80.192,100 62,118.192 62,140.6L62,262.4C62,284.808 80.192,303 102.6,303L224.4,303C246.808,303 265,284.808 265,262.4L265,140.6Z" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-24.9552)">
    //       <path d="M559.37,206.517C564.893,206.517 569.37,210.994 569.37,216.517C569.37,222.04 564.893,226.517 559.37,226.517C553.847,226.517 549.37,222.04 549.37,216.517C549.37,210.994 553.847,206.517 559.37,206.517ZM564.37,176.196C564.37,176.196 554.37,175.048 554.37,176.705L554.37,197.175C545.74,199.409 539.344,207.251 539.37,216.575C539.4,227.057 547.803,235.924 558.27,236.487C569.795,237.108 579.37,227.91 579.37,216.517C579.37,207.218 572.982,199.404 564.37,197.175L564.37,176.196Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.801696,0,0,0.801696,7.03627,23.7566)">
    //       <path d="M194,81L202,81" className="fill:none;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-32.9721)">
    //       <path d="M469.537,287.6L452.287,287.6L452.287,297.6L465.703,297.6C467.36,297.6 468.703,298.944 468.703,300.6L468.703,358.691C471.978,359.825 475.312,362.076 478.703,362.939L478.703,296.767C478.703,291.704 474.599,287.6 469.537,287.6Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-32.9721)">
    //       <path d="M543.537,297.85C538.014,297.85 533.537,293.373 533.537,287.85C533.537,282.328 538.014,277.85 543.537,277.85C549.06,277.85 553.537,282.328 553.537,287.85C553.537,293.373 549.06,297.85 543.537,297.85ZM605.037,240.684L605.037,279.85C605.037,281.507 603.694,282.85 602.037,282.85L562.879,282.85C560.645,274.221 552.803,267.824 543.479,267.85C532.997,267.88 524.13,276.283 523.565,286.75C522.945,298.276 532.144,307.85 543.537,307.85C552.836,307.85 560.65,301.462 562.879,292.85L605.87,292.85C610.933,292.85 615.037,288.746 615.037,283.684L615.037,244.517C615.037,242.86 616.38,241.517 618.037,241.517L625.574,241.517L625.71,231.517L614.203,231.517C609.141,231.517 605.037,235.621 605.037,240.684Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-35.3772)">
    //       <path d="M513.037,343.767C507.514,343.767 503.037,339.29 503.037,333.767C503.037,328.244 507.514,323.767 513.037,323.767C518.56,323.767 523.037,328.244 523.037,333.767C523.037,339.29 518.56,343.767 513.037,343.767ZM533.037,333.767C533.037,322.739 524.065,313.767 513.037,313.767C502.008,313.767 493.037,322.739 493.037,333.767C493.037,343.066 499.425,350.88 508.037,353.109L508.037,366.776C508.565,366.783 509.091,366.796 509.62,366.796C512.448,366.796 515.254,366.693 518.037,366.508L518.037,353.109C526.648,350.88 533.037,343.066 533.037,333.767Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.601272,0,0,0.601272,69.5686,72.4596)">
    //       <circle cx="180" cy="195" r="8" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-201.322,-36.1789)">
    //       <path d="M568.537,323.767C563.474,323.767 559.37,327.871 559.37,332.934L559.37,367.707C562.784,366.224 566.122,368.336 569.37,366.565L569.37,336.767C569.37,335.11 570.713,333.767 572.37,333.767L636.493,333.767L637.073,323.767L568.537,323.767Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(-0.643495,7.88054e-17,-7.88054e-17,-0.643495,498,351.252)">
    //       <path d="M568.537,323.767C563.474,323.767 559.37,327.871 559.37,332.934L559.37,408.82L569.37,408.924L569.37,336.767C569.37,335.11 570.713,333.767 572.37,333.767L624.034,333.767C624.034,333.767 623.368,323.767 623.368,323.767L568.537,323.767Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.643495,0,0,0.643495,-194.106,-25.7569)">
    //       <path d="M589.953,198.1C589.953,203.163 594.057,207.267 599.12,207.267L626.932,207.267C625.676,203.861 624.271,200.527 622.734,197.267L602.953,197.267C601.297,197.267 599.953,195.924 599.953,194.267L599.953,179.07L589.953,175.935L589.953,198.1Z" className="fill:rgb(8,6,5);fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,54.4501)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,48.0365)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,41.6229)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.774973,0,0,0.57264,-4.50816,35.2094)">
    //       <path d="M168,128.75C168,127.784 167.421,127 166.707,127L139.293,127C138.579,127 138,127.784 138,128.75L138,132.25C138,133.216 138.579,134 139.293,134L166.707,134C167.421,134 168,133.216 168,132.25L168,128.75Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.66808,0,0,2.17603,96.8262,-91.4586)">
    //       <path d="M168,128.75C168,127.784 165.446,127 162.3,127L143.7,127C140.554,127 138,127.784 138,128.75L138,132.25C138,133.216 140.554,134 143.7,134L162.3,134C165.446,134 168,133.216 168,132.25L168,128.75Z" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(0.801696,0,0,0.801696,7.03627,23.7566)">
    //       <rect x="227" y="214" width="8" height="6" className="fill:rgb(8,6,5);" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M191.037,413.008L172.191,457.322C172.078,457.55 171.963,457.892 171.735,458.235C171.735,458.349 171.621,458.349 171.621,458.349C171.507,458.578 171.278,458.806 171.05,459.035C170.936,459.149 170.822,459.149 170.822,459.149C170.593,459.378 170.365,459.606 170.136,459.72C170.136,459.833 170.021,459.833 170.021,459.948C169.679,460.177 169.451,460.405 168.994,460.519C168.994,460.519 168.88,460.519 168.88,460.633C168.651,460.633 168.309,460.747 167.967,460.862L167.738,460.862C167.394,460.976 167.052,460.976 166.595,460.976C166.252,460.976 165.909,460.976 165.568,460.862L165.339,460.862C165.11,460.748 164.882,460.633 164.539,460.633L164.425,460.519L164.311,460.519C163.968,460.405 163.626,460.176 163.283,459.833L163.283,459.72C162.941,459.606 162.826,459.377 162.597,459.149C162.597,459.149 162.369,459.149 162.369,459.035C162.14,458.806 161.912,458.578 161.798,458.349C161.798,458.349 161.684,458.349 161.684,458.235C161.455,457.892 161.341,457.549 161.227,457.322L152.89,437.563L144.781,457.322C144.667,457.55 144.438,457.892 144.21,458.235L144.21,458.349C143.982,458.578 143.754,458.806 143.525,459.035C143.525,459.149 143.41,459.149 143.41,459.149C143.181,459.378 142.953,459.606 142.725,459.834C142.268,460.177 142.039,460.405 141.697,460.52L141.468,460.52C141.468,460.52 141.355,460.52 141.355,460.634C141.126,460.634 140.783,460.748 140.669,460.863L140.44,460.863C139.983,460.977 139.64,460.977 139.297,460.977C138.84,460.977 138.498,460.977 138.155,460.863L137.813,460.863C137.584,460.749 137.356,460.634 137.127,460.634C137.013,460.52 137.013,460.52 136.898,460.52C136.556,460.406 136.099,460.177 135.87,459.834C135.756,459.834 135.756,459.834 135.756,459.721C135.642,459.607 135.414,459.378 135.071,459.15L134.842,459.036C134.728,458.807 134.499,458.579 134.385,458.35C134.271,458.35 134.271,458.35 134.271,458.236C134.042,457.893 133.928,457.55 133.7,457.323L114.969,413.009C113.599,409.925 115.083,406.498 118.282,405.128C121.023,403.871 124.564,405.242 125.82,408.555L139.297,439.278L147.292,420.205C148.32,417.921 150.49,416.55 152.889,416.55C155.401,416.55 157.571,417.921 158.485,420.205L166.594,439.278L180.071,408.555C181.214,405.242 184.868,403.871 187.723,405.128C190.809,406.497 192.408,409.924 191.037,413.008Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M365.324,387.195C365.324,383.883 368.064,381.028 371.605,381.028C375.031,381.028 377.773,383.883 377.773,387.195" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M390.678,452.639C385.768,447.614 382.797,440.533 382.797,432.538C382.797,424.771 385.768,418.033 390.678,412.551C395.817,407.183 402.442,403.87 410.323,403.87C417.86,403.87 424.714,407.183 429.397,412.551C434.536,418.033 437.391,424.772 437.391,432.538C437.391,440.532 434.536,447.613 429.397,452.639C424.713,458.007 417.86,461.32 410.323,461.32C402.441,461.319 395.816,458.007 390.678,452.639ZM395.246,432.538C395.246,437.449 396.73,441.446 399.357,444.644C402.212,447.385 405.982,448.87 410.322,448.87C414.32,448.87 417.974,447.386 420.83,444.644C423.685,441.446 425.283,437.449 425.283,432.538C425.283,427.855 423.685,423.743 420.83,420.66C417.975,418.147 414.32,416.319 410.322,416.319C405.982,416.319 402.213,418.147 399.357,420.66C396.73,423.743 395.246,427.855 395.246,432.538Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M434.648,452.639C429.738,447.614 426.769,440.533 426.769,432.538C426.769,424.771 429.738,418.033 434.648,412.551C439.789,407.183 446.414,403.87 454.293,403.87C461.832,403.87 468.686,407.183 473.367,412.551C478.506,418.033 481.361,424.772 481.361,432.538C481.361,440.532 478.506,447.613 473.367,452.639C468.685,458.007 461.832,461.32 454.293,461.32C446.414,461.319 439.789,458.007 434.648,452.639ZM439.219,432.538C439.219,437.449 440.703,441.446 443.33,444.644C446.185,447.385 449.953,448.87 454.293,448.87C458.291,448.87 461.945,447.386 464.801,444.644C467.656,441.446 469.256,437.449 469.256,432.538C469.256,427.855 467.656,423.743 464.801,420.66C461.946,418.147 458.291,416.319 454.293,416.319C449.953,416.319 446.186,418.147 443.33,420.66C440.703,423.743 439.219,427.855 439.219,432.538Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M293.466,404.213C306.487,404.213 317.223,414.949 317.223,427.969L317.223,455.266C317.223,458.464 314.482,461.32 311.169,461.32C307.743,461.32 305.116,458.465 305.116,455.266L305.116,427.969C305.116,421.459 299.976,416.32 293.466,416.32C286.843,416.32 281.589,421.46 281.474,427.969L281.474,455.266C281.474,458.464 278.962,461.32 275.536,461.32C272.338,461.32 269.369,458.465 269.369,455.266L269.369,427.969C269.368,414.95 280.331,404.213 293.466,404.213Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M257.716,404.213C270.737,404.213 281.473,414.949 281.473,427.969L281.473,455.266C281.473,458.464 278.732,461.32 275.419,461.32C271.993,461.32 269.366,458.465 269.366,455.266L269.366,427.969C269.366,421.459 264.226,416.32 257.716,416.32C251.093,416.32 245.839,421.46 245.724,427.969L245.724,434.266C245.724,437.464 243.212,440.32 239.786,440.32C236.588,440.32 233.619,458.465 233.619,455.266L233.619,427.969C233.618,414.95 244.581,404.213 257.716,404.213Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M221.41,461.319C208.389,461.319 197.653,450.583 197.653,437.563L197.653,410.266C197.653,407.068 200.394,404.212 203.707,404.212C207.133,404.212 209.76,407.067 209.76,410.266L209.76,437.563C209.76,444.073 214.9,449.212 221.41,449.212C228.033,449.212 233.287,444.072 233.402,437.563L233.402,428.266C233.402,425.068 235.914,414.212 239.34,414.212C242.538,414.212 245.507,407.067 245.507,410.266L245.507,437.563C245.508,450.582 234.545,461.319 221.41,461.319Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <path d="M331.061,453.435C326.151,448.41 323.18,441.329 323.18,433.334C323.18,425.567 326.151,418.829 331.061,413.347C336.2,407.979 342.825,404.666 350.706,404.666C358.243,404.666 365.097,407.979 369.78,413.347C374.919,418.829 377.774,425.568 377.774,433.334C377.774,441.328 374.919,448.409 369.78,453.435C365.096,458.803 358.243,462.116 350.706,462.116C342.824,462.115 336.199,458.803 331.061,453.435ZM335.629,433.334C335.629,438.245 337.113,442.242 339.74,445.44C342.595,448.181 346.365,449.666 350.705,449.666C354.703,449.666 358.357,448.182 361.213,445.44C364.068,442.242 365.666,438.245 365.666,433.334C365.666,428.651 364.068,424.539 361.213,421.456C358.358,418.943 354.703,417.115 350.705,417.115C346.365,417.115 342.596,418.943 339.74,421.456C337.113,424.539 335.629,428.651 335.629,433.334Z" className="fill:white;fill-rule:nonzero;" />
    //     </g>
    //     <g transform="matrix(1.21259,0,0,1.21259,115.667,-402.075)">
    //       <rect x="365.324" y="387.195" width="12.449" height="44.281" className="fill:white;" />
    //     </g>
    //     <g transform="matrix(1,0,0,1,-399,-268)">
    //       <g transform="matrix(34,0,0,34,1099.69,467.134)">
    //       </g>
    //       <text x="653.271px" y="467.134px" className="font-family:'Nunito-Bold', 'Nunito';font-weight:700;font-size:34px;fill:white;">A<tspan x="678.662px 690.423px 700.939px 724.604px 752.352px 779.404px 800.395px 822.267px 849.318px 870.31px 880.826px 906.732px 928.603px 955.655px 977.526px 1002.05px 1027.44px 1048.44px 1076.18px " y="467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px 467.134px ">I CONTENT GENERATOR</tspan></text>
    //     </g>
    //   </g>
    // </svg>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <LogoImage className={className} />
    </Link>
  );
}
