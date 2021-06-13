jQuery(function($){
    const titles = [
        `سلام :)`,

        `خوب...؟`,

        `دنیای بزرگ`,

        `و...`,

        `بازم سلام!`,

        `چیکار کنیم؟`,

        `بریم پیاده‌روی`,
        
        `بخوان...`,
        
        `دستت رو بده من`
    ];
    
    const descriptions = [
        `راستش شنیدم می‌خوای نویسنده شی... یا شاید هم فقط می‌خوای بنویسی ، فرقی
        نداره! بهرحال عطش نوشتن در تو وجود داره!`,

        `خوب قضیه اینه که نوشتن جزو قشنگ‌ترین کارهایی حساب می‌شه که یه آدم می‌تونه انجام بده!`,

        `قضیه مهم اینجاست که نوشتن اصلا سخت نیست! توی سر و توی دل ما ، دنیاهای بزرگ و عجیب و متفاوتی وجود داره...`,

        `و فقط باید راهش رو پیدا کنی تا دریچه‌های دنیات رو باز کنی و تصاویری ازش رو بریزی بیرون!`,

        `پس من ، که یه نصف اپ هستم اومدم برای کمک ، بیا با هم یه راه ساده رو طی کنیم تا بتونیم بنویسیم :))`,

        `ببین<br />اگر می‌خوای بتونی خوب بنویسی ، شرط اصلیش اینه که بتونی برای خودت بنویسی ، یعنی از همین اول به فکر چاپ کردن
        مقاله و کتاب و... نباش ، چون اینطوری داری به انتهای یه مسیر طولانی نگاه می‌کنی که تازه اول راهی!<br />
        مهم اینه که بتونی دنیای خودت رو روی کاغذ با کلمات ترسیم کنی!`,

        `پس سریع شروع کنیم. <br />
        <br />
        فرض کن نوشتن مثل قدم زدن می‌مونه. برای جلو رفتن پای راستت رو برمیداری می‌بری جلو ، و بعد پای چپ.
        <br />
        اگر همزمان با هردوپا این کار رو انجام بدی ، بعد از یه مدت خسته می‌شی!
        <br />
        و اگر بخوای با یک پا این کار رو بکنی و پای دیگه‌ت سر جاش بمونه ، خوب یکم خنده‌دار میشه :))`,

        `پای راستت که برمی‌داری ، مطالعه کردن و خوندنه.
        <br />
        خوندن و مطالعه کردن ، شروع سختی داره. و همین ما رو از بزرگترین لذتی که می‌تونیم داشته باشیم دور نگه داشته!
        <br />
        پای راست تو توی این مسیر ، مطالعه کردن تویه که به دست خودته. پس همین الان ، یه کتاب انتخاب کن و شروع کن به خوندن.
        <br />
        با این کار ، هم سفر قشنگی به دنیای کتاب شروع می‌کنی که روحتم از جذابیتش خبر نداره ، و هم اینکه پای راستت در مسیر نوشتن شروع به حرکت می‌کنه.
        <br />
        پیشنهاد می‌خوای؟ همین الان کتاب دنیای سوفی رو پیدا کن و شروعش کن :)
        `,

        `اینجا آخر راهنما و شروع راه تویه که می‌خوام دستت رو بگیرم.
        <br />
        از این به بعد اگر من رو اجرا کنی ، یه بخش به اسم عنوان بهت نمایش داده میشه. هر عنوانی که دلت می‌خواد رو وارد می‌کنی.
        <br />
        بعد از اون وارد صفحه نوشتن می‌شی ، هر مقدار در هر زمینه‌ای دلت می‌خواد بنویس.
        <br />
        <strong>و این دقیقا نقش پای چپت رو داره!</strong>
        <br />
        شاید بپرسی ، خوب که چی بشه! هیچ وقت عجله نکن ، تو فقط سعی کن پای راست و چپت رو حرکت بدی ، من توی این مسیر بعد از چند روز یه سری چیزا رو بهت نشون می‌دم که ببینی داری جلو می‌ری.
        <br />
        فقط رازش اینه که بتونی دو تا پاهات رو به حرکت در بیاری و متوقفش نکنی :)
        `
    ];
    
    const buttons = [
        `همینطوره...`,

        `قبول!`,

        `...`,

        `چطور؟`,

        `هستم`,

        `...`,

        `بریم پیاده روی`,

        `می‌خوام قدم رو کامل کنم`,

        `پس بریم :)`
    ];

    const speeds = [
        500,
        500,
        500,
        500,
        1000,
        500,
        500,
        500,
        800,
    ]

    // Counter
    let slide_num = 0;


    // Set elements content
    const changeSlide = async (i) => {
        $('.title').html(titles[i]);
        $('.description').html(descriptions[i]);
        $('.button').html(buttons[i]);
    }

    $('.button').click(function(){
        if(slide_num < titles.length - 1){
            slide_num++;

            const speed = speeds[slide_num];

            $('.container').fadeOut(speed, function(){
                changeSlide(slide_num).then(()=>{
                    $('.container').fadeIn(speed)
                });
            });

        }else{
            alert('تموم شده دیگه!')
        }
    });

    // Set the first content
    $(document).ready(function(){
        changeSlide(slide_num);
    })
})

//TODO set in storage for one time load this page
//TODO redirect to title page