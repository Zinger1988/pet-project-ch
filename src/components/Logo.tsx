interface LogoProps {
  className?: string;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', textColor = 'black' }) => {
  return (
    <svg className={className} viewBox='0 0 565 126' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_742_275)'>
        <path
          d='M392.3 90.3001L391.6 89.8001L391.1 90.5001C390.3 91.5001 389.1 92.4001 387.7 93.1001C386.2 93.8001 384.8 94.1001 383.5 94.1001C382.1 94.1001 381 93.8001 380.2 93.0001C379.5 92.3001 379.1 90.9001 379.1 88.9001V55.9001H385.3C386.9 55.9001 388.7 54.8001 389.4 53.4001C390.1 52.0001 390.8 49.9001 390.8 46.9001V46.1001H389.9H378.9V31.6001C378.9 27.1001 373 26.8001 370 26.8001C368.8 26.8001 367.5 26.9001 366.1 27.2001L366 30.0001C365.8 35.6001 363.3 41.5001 358.7 44.5001C357 45.6001 354.3 46.0001 352.5 46.0001H352.4H328.2L327.9 46.3001C327 47.3001 326.3 48.4001 325.8 49.7001C325.3 51.0001 325.1 52.4001 325.1 53.7001V54.5001H325.9C327.3 54.5001 328.7 54.9001 330.2 55.8001C331.1 56.3001 332.2 57.1001 332.2 58.0001C332.2 58.3001 332 59.1001 330.3 60.8001L319.3 72.2001V23.9001C319.3 21.8001 318.8 20.2001 317.9 19.2001C315.8 17.0001 311 17.3001 303.3 19.4001C299.1 20.5001 295.5 21.9001 292.8 23.3001L292.4 23.5001V29.4001H293.2C296.6 29.4001 298 30.1001 298.6 30.6001C299.5 31.4001 299.9 32.6001 299.9 34.2001V95.5001C299.9 97.4001 299.5 98.8001 298.7 99.6001C297.9 100.4 296.5 100.8 294.5 100.8H293.7H292.7C290.7 100.8 289.3 100.4 288.5 99.7001C287.7 99.0001 287.3 97.5001 287.3 95.4001V24.4001C287.3 22.3001 286.8 20.8001 285.9 19.8001C283.8 17.7001 278.7 18.1001 271.2 20.0001C267 21.1001 263.5 22.4001 260.7 23.9001L260.3 24.1001V30.0001H261.1C264.5 30.0001 266 30.7001 266.6 31.2001C267.5 32.0001 267.9 33.2001 267.9 34.8001V94.9001C267.9 96.9001 267.7 98.6001 266.7 99.1001C265.9 99.5001 265.3 99.3001 264.8 99.3001C261.7 98.8001 260.3 96.8001 260.3 93.6001V63.6001C260.3 57.5001 258.3 52.7001 254.2 49.5001C250.2 46.3001 244.3 44.7001 236.7 44.7001C231.1 44.7001 226.4 45.4001 222.5 46.9001C218.6 48.4001 215.7 50.4001 213.8 52.8001C211.9 55.3001 210.9 58.0001 210.9 60.8001C210.9 63.7001 211.9 66.0001 213.8 67.9001C215.7 69.7001 218.2 70.6001 221.3 70.6001C224.1 70.6001 226.5 69.8001 228.4 68.1001C230.3 66.4001 231.3 64.2001 231.3 61.6001C231.3 60.1001 230.9 58.7001 230.1 57.5001C229.6 56.7001 228.9 56.0001 228 55.5001C229.2 54.9001 230.6 54.7001 232.3 54.7001C234.6 54.7001 236.5 55.3001 237.9 56.5001C239.2 57.6001 239.9 59.6001 239.9 62.4001V76.1001C238.5 75.6001 236.9 75.1001 235.1 74.8001C232.7 74.3001 230.3 74.1001 228 74.1001C221.3 74.1001 216.2 75.7001 212.7 78.7001C209.2 81.8001 207.4 86.0001 207.4 91.3001C207.4 92.9001 205.7 94.4001 197.8 94.4001C196.4 94.4001 195.3 94.1001 194.5 93.3001C193.9 92.8001 193.6 91.4001 193.6 89.4001V58.3001H204.3L204.5 57.9001C205.3 56.6001 205.8 55.1001 206.1 53.3001C206.3 51.6001 206.4 49.7001 206.4 47.4001V46.6001H193.4V35.6001C193.4 33.5001 192.7 31.6001 191.2 29.9001C189.1 27.5001 185.6 26.8001 180.6 27.6001L180 27.7001L179.9 28.3001C179.5 31.5001 178.7 34.8001 177.4 38.1001C176.1 41.4001 174.6 44.1001 172.8 46.2001C171.1 48.3001 169.3 49.4001 167.6 49.7001L166.9 49.9001V58.4001H174V88.7001C174 95.9001 175.7 101.2 179.1 104.4C182.4 107.6 186.9 109.2 192.4 109.2C195.9 109.2 198.9 108.6 201.4 107.5C203.9 106.4 205.9 104.9 207.2 103.2C208.2 101.8 208.8 100.4 209.1 99.0001C210 101 211.3 102.8 213.1 104.3C216.7 107.6 221.6 109.2 227.4 109.2C230.7 109.2 233.6 108.7 236.2 107.6C238.4 106.7 240.4 105.6 242 104.3C244.3 107.6 248 109.2 253 109.2C255.4 109.2 257.9 109 260.3 108.4C261.8 108 263.9 107.1 264.8 106.5C264.8 106.6 266.7 108.7 269.1 108.7H297H298.4H322.5L322.7 108.5C324.7 106.7 325.7 104.5 325.7 101.9V101.1H324.9C322.8 101.1 321.3 100.7 320.6 99.9001C319.8 99.1001 319.4 97.7001 319.4 95.8001V79.8001C320.7 80.5001 321.8 81.6001 322.7 83.0001C323.9 84.9001 325.4 87.7001 327 91.4001C328.7 95.2001 330.2 98.3001 331.7 100.7C333.2 103.1 335.3 105.2 337.9 107C340.6 108.7 345.2 110 349.1 109.6C358.6 108.8 358.2 100.2 358.2 100.2C356.9 99.9001 354.4 98.5001 353.3 97.1001C352.1 95.6001 350.2 92.5001 347.8 88.0001C347.7 87.9001 347.4 87.2001 344.8 82.7001C343.2 79.7001 341.3 77.5001 339.3 76.0001C337.7 74.8001 335.7 73.9001 333.5 73.4001L349.5 57.6001C350.5 56.7001 351.5 56.0001 352.4 55.5001C353.3 55.0001 354.6 54.8001 356.2 54.8001H359.6V88.4001C359.6 95.6001 361.3 100.9 364.7 104.1C368 107.3 372.5 108.9 378 108.9C381.5 108.9 384.5 108.3 387 107.2C389.5 106.1 391.5 104.6 392.8 102.9C394.1 101.1 394.8 99.2001 394.8 97.3001C394.8 96.2001 394.6 95.1001 394.3 93.8001C393.8 92.1001 393.2 91.0001 392.3 90.3001ZM240 96.7001C239.4 97.1001 238.7 97.4001 237.8 97.7001C236.8 98.0001 235.8 98.2001 234.7 98.2001C232.6 98.2001 231.1 97.6001 229.9 96.5001C228.7 95.3001 228.1 93.9001 228.1 92.1001C228.1 89.8001 228.7 88.2001 229.9 87.0001C231.1 85.8001 232.6 85.3001 234.5 85.3001C235.5 85.3001 236.5 85.5001 237.6 85.8001C238.5 86.1001 239.3 86.4001 240 86.8001V96.7001Z'
          fill={textColor}
        />
        <path
          d='M562.5 76.5C563.6 74.5 564.2 71.7 564.2 68.2C564.2 60.9 562.1 55.1 557.8 51C553.6 46.9 547.9 44.8 540.8 44.8C535.2 44.8 530.2 46.2 525.8 48.8C521.4 51.5 517.9 55.3 515.4 60.3C513.9 63.2 512.9 66.5 512.3 70C511.9 65.6 510.8 61.8 509.2 58.5C506.9 54 503.9 50.6 500.2 48.4C496.5 46.2 492.3 45.1 487.9 45.1C483.1 45.1 479.3 46.2 476.4 48.4L476.7 39.6V23.5C476.7 21.4 476.3 19.9 475.3 18.9C474.4 17.9 472.9 17.5 470.8 17.5C468.2 17.5 464.9 18.2 460.8 19.5C456.7 20.8 453.3 22.4 450.8 24.1L450.4 24.4V24.8V28.4V29.2H451.2C456.6 29.2 457.3 31.9 457.3 33.9V96.3C457 96.5 456.2 96.8 454.6 96.8L453.8 96.7C452.3 96.6 451.2 96 450.4 95C449.6 93.9 449.2 92.6 449.2 91V52.1C449.2 49.2 448.6 47.4 447.4 46.5C446.3 45.7 444.1 45.3 440.8 45.3C436.9 45.3 433.3 45.7 430 46.6C426.6 47.5 424.4 48.5 423.1 49.5L422.8 49.8V50.2V55.2V56H423.6C429.1 56 429.1 58 429.1 58.7V92C428.1 93.2 427 94.2 425.7 95C424.4 95.8 423 96.3 421.7 96.3C420.2 96.3 419.1 95.8 418.5 94.9C417.8 93.9 417.5 92.3 417.5 90.1V52.1C417.5 50.2 417.3 48.7 416.9 47.8C416.4 46.7 415.5 46 414.3 45.7C413.2 45.4 411.6 45.3 409.4 45.3C405.7 45.3 402.2 45.7 398.9 46.7C392.6 48.6 391.8 55.2 391.8 55.2V56H392.6C394.3 56 395.5 56.2 396.3 56.7C396.7 56.9 397.3 57.4 397.3 58.7V89.8C397.3 95.5 398.9 100.1 401.9 103.5C405 106.9 409.3 108.6 414.9 108.6C421.3 108.6 426.4 106.3 430.1 101.9C430.8 103.8 432 105.3 433.5 106.4C435.4 107.9 437.8 108.6 440.6 108.6C443.2 108.6 445.9 108.2 448.5 107.4C449 107.3 449.4 107.1 449.8 106.9C449.8 106.9 450 106.8 450.3 106.7C450.4 106.7 450.4 106.6 450.5 106.6C451.9 106 455.1 104.6 457.5 102.8C457.8 104.1 459.9 105.7 461.2 106.2C463.5 107 465.3 107.3 468.7 107.8C473.2 108.5 477.4 108.9 481.1 108.9C486.9 108.9 492.3 107.6 497.1 105C501.9 102.4 505.8 98.4 508.6 93.3C510.4 90.1 511.6 86.5 512.2 82.5C512.7 86.8 513.7 90.7 515.4 94.1C517.7 98.8 521.1 102.5 525.4 105C529.7 107.5 534.8 108.7 540.5 108.7C544.6 108.7 548.3 108 551.6 106.7C554.9 105.4 557.5 103.8 559.4 101.9C561.4 99.9 562.4 98.2 562.4 96.6C562.4 95.6 562.2 94.4 561.7 93.1C561.2 91.8 560.6 90.8 559.9 90.1L559.4 89.6L558.8 90C554.9 92.9 550.6 94.4 546.1 94.4C537.9 94.4 533.6 89.6 533 79.7H556.5C559.1 79.8 561.3 78.7 562.5 76.5ZM488.4 94.5C486.5 97.6 484.1 99.1 481.1 99.1C479.3 99.1 477.7 98.6 476.5 97.4V57.2C477.5 56.6 478.6 56.3 480 56.3C483.4 56.3 486.1 58 488.1 61.6C490.2 65.3 491.3 71.1 491.3 78.7C491.3 86 490.3 91.3 488.4 94.5ZM544.7 68.8C544.6 69 544.4 69.5 543.1 69.5H532.5C532.7 64 533.5 60.1 535 57.7C536.4 55.3 538.1 54.2 540.2 54.2C541.7 54.2 542.9 54.9 543.8 56.4C544.8 58 545.3 61 545.3 65.2C545.2 66.9 545 68.1 544.7 68.8Z'
          fill={textColor}
        />
        <path
          d='M135.4 34C133.5 25.6 124.2 17.5 115.9 16.4C100.4 14.5 84.8 13.5 69.3 13.5C53.8 13.5 38.2 14.5 22.7 16.4C14.2 17.5 4.9 25.6 3 34C-1 53.1 -1 72.2 3 91.4C4.9 99.8 14.2 107.9 22.5 109C25.8 109.4 29.1 109.8 32.3 110.1V120.3C32.3 123.3 34.7 125.3 37.3 125.3C38.4 125.3 39.5 124.9 40.5 124.1L55.3 111.6C59.9 111.8 64.5 111.9 69.1 111.9C84.6 111.9 100.2 111 115.7 109C124.1 107.9 133.4 99.8 135.2 91.4C139.4 72.2 139.4 53.1 135.4 34Z'
          fill='black'
        />
        <path
          d='M39.2 103.8L33 103.2C29.5 102.9 26.3 102.5 23.3 102.1C17.6 101.3 10.8 95.1999 9.6 89.7999C5.8 71.7999 5.8 53.4999 9.6 35.3999C10.8 29.9999 17.6 23.8999 23.3 23.1999C38.4 21.2999 53.8 20.3999 69 20.3999C84.2 20.3999 99.6 21.2999 114.8 23.1999C120.5 23.9999 127.3 30.0999 128.5 35.4999C132.3 53.4999 132.3 71.7999 128.5 89.8999C127.3 95.2999 120.5 101.4 114.8 102.1C99.9 104 84.5 105 69.3 105C64.8 105 60.2 104.9 55.7 104.8L53 104.7L39.2 116.4V103.8Z'
          fill='#FFE451'
        />
        <path
          d='M44.4 72.9003C42.8 72.9003 41.5 71.6003 41.5 70.0003V55.2003C41.5 53.6003 42.8 52.3003 44.4 52.3003C46 52.3003 47.3 53.6003 47.3 55.2003V70.0003C47.2 71.6003 46 72.9003 44.4 72.9003Z'
          fill='black'
        />
        <path
          d='M69.2 70.0003C67.6 70.0003 66.3 68.7003 66.3 67.1003V58.2003C66.3 56.6003 67.6 55.3003 69.2 55.3003C70.8 55.3003 72.1 56.6003 72.1 58.2003V67.1003C72.1 68.7003 70.8 70.0003 69.2 70.0003Z'
          fill='black'
        />
        <path
          d='M94 72.9003C92.4 72.9003 91.1 71.6003 91.1 70.0003V55.2003C91.1 53.6003 92.4 52.3003 94 52.3003C95.6 52.3003 96.9 53.6003 96.9 55.2003V70.0003C96.9 71.6003 95.6 72.9003 94 72.9003Z'
          fill='black'
        />
        <path
          d='M56.8 84.1001C55.2 84.1001 53.9 82.8001 53.9 81.2001V44.0001C53.9 42.4001 55.2 41.1001 56.8 41.1001C58.4 41.1001 59.7 42.4001 59.7 44.0001V81.3001C59.7 82.9001 58.4 84.1001 56.8 84.1001Z'
          fill='black'
        />
        <path
          d='M81.6 84.1001C80 84.1001 78.7 82.8001 78.7 81.2001V44.0001C78.7 42.4001 80 41.1001 81.6 41.1001C83.2 41.1001 84.5 42.4001 84.5 44.0001V81.3001C84.5 82.9001 83.2 84.1001 81.6 84.1001Z'
          fill='black'
        />
      </g>
      <defs>
        <clipPath id='clip0_742_275'>
          <rect width='564.2' height='125.3' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;