//FIXME Add more qoutes

jQuery(function ($) {
  /**
   *
   *
   * Qoutes
   *
   *
   */
  const greetings = [
    "منتظرت بودم :)",
    "قلم‌ انتظارت رو می‌کشید!",
    "نذار هیچ کاغذی سفید بمونه!",
    "کتاب‌ها رو کسانی مثل تو خلق می‌کنن!",
    "خوشحالم که می‌بینمت دوباره :)",
    "دستت رو با ذهنت پیوند بده!",
  ];

  const subjects = [
    `هرمس ، سگ باوفا`,
    `کارگر بیچاره‌ای که در میدان اصلی شهر در دام سقراط می‌افتاد`,
    `گل‌های اطلسی رنگ باخته`,
  ];

  const buttons = [`دست به قلم شو`, `پس شروع کنیم`, `بریم پیاده روی`];

  const qoutes = [
    [
      `ما می نویسیم تا زندگی را دو بار ، در لحظه و با نگاه به گذشته بچشیم.`,
      `Anaïs Nin`,
    ],
  ];

  /**
   *
   *
   *
   * Print Data
   *
   *
   *
   */
  const randomNum = (array) => {
    min = 0;
    max = array.length - 1;

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  $(document).ready(function () {
    // Set random greeting
    $(".greeting").html(greetings[randomNum(greetings)]);

    // Set random subject place holder
    $(".subject").attr("placeholder", subjects[randomNum(subjects)]);

    // Set button value
    $(".button").html(buttons[randomNum(buttons)]);

    // Set qoutes
    const the_qoute = qoutes[randomNum(qoutes)];
    $(".qoute").html(the_qoute[0]);
    $(".source").html(the_qoute[1]);
  });
});
