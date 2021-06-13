jQuery(function ($) {
  /**
   *
   *
   * Qoutes
   *
   *
   */
  const greetings = [
    "",
  ];

  const subjects = [
    ``,
  ];

  const buttons = [``];

  const qoutes = [
    [
      ``,
      ``,
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
