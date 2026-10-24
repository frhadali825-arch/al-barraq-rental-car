/* myFunctions.js - ملف التوابع */

$(document).ready(function () {

  // إظهار / إخفاء تفاصيل السيارة
  $(".details-btn").click(function () {
    var id = $(this).attr("data-target");
    var row = $("#" + id);

    if (row.is(":visible")) {
      row.slideUp(250);
      $(this).text("عرض");
    } else {
      row.slideDown(250);
      $(this).text("إخفاء");
    }
  });

  //المتابعة
  $("#proceedBtn").click(function () {
    if ($(".car-check:checked").length === 0) {
      alert("اختر سيارة واحدة على الأقل.");
      return;
    }
    $("#bookingSection").slideDown(400);
  });

  // بيانات السيارات
  var carData = {
    "CR-001": { model: "Toyota Corolla",  price: 250000 },
    "CR-002": { model: "Kia Sportage",    price: 400000 },
    "CR-003": { model: "Hyundai Elantra", price: 300000 },
    "CR-004": { model: "Chevrolet Spark", price: 180000 },
    "CR-005": { model: "Nissan Sunny",    price: 220000 }
  };

  // إرسال النموذج
  $("#bookingForm").submit(function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    var selected = [];
    $(".car-check:checked").each(function () {
      selected.push($(this).val());
    });

    var start = new Date($("#startDate").val());
    var end   = new Date($("#endDate").val());
    var days  = Math.round((end - start) / (1000 * 60 * 60 * 24));

    var msg = "تم استلام الطلب\n\nالسيارات:\n";
    var total = 0;

    for (var i = 0; i < selected.length; i++) {
      var c = carData[selected[i]];
      var sub = c.price * days;
      msg += "- " + selected[i] + " (" + c.model + ")\n";
      msg += "  عدد الأيام: " + days + "\n";
      msg += "  المبلغ: " + sub.toLocaleString() + " ل.س\n\n";
      total += sub;
    }

    msg += "المجموع قبل الخصم: " + total.toLocaleString() + " ل.س\n";

    // خصم 5% عند 10 أيام أو أكثر
    if (days >= 10) {
      var dis = total * 0.05;
      msg += "الخصم (5%): " + dis.toLocaleString() + " ل.س\n";
      msg += "المجموع النهائي: " + (total - dis).toLocaleString() + " ل.س\n";
    } else {
      msg += "المجموع النهائي: " + total.toLocaleString() + " ل.س\n";
    }

    alert(msg);
  });

});


/* التحقق من الحقول */
function validateForm() {

  var name  = $("#fullName").val().trim();
  var nid   = $("#nationalId").val().trim();
  var start = $("#startDate").val().trim();
  var end   = $("#endDate").val().trim();
  var mob   = $("#mobile").val().trim();
  var mail  = $("#email").val().trim();

  // الاسم 
  if (name !== "" && !/^[\u0621-\u064A\s]+$/.test(name)) {
    alert("الاسم بأحرف عربية فقط.");
    return false;
  }

  // الرقم الوطني: إلزامي، 11 خانة
  if (nid === "") {
    alert("الرقم الوطني إلزامي.");
    return false;
  }
  if (!/^(0[1-9]|1[0-4])[0-9]{9}$/.test(nid)) {
    alert("الرقم الوطني: 11 خانة، أول خانتين 01-14.");
    return false;
  }

  // تاريخ البداية
  if (start === "") {
    alert("تاريخ البداية إلزامي.");
    return false;
  }

  // تاريخ النهاية
  if (end === "") {
    alert("تاريخ النهاية إلزامي.");
    return false;
  }
  if (new Date(end) <= new Date(start)) {
    alert("تاريخ النهاية يجب أن يكون بعد البداية.");
    return false;
  }

  // الموبايل 
  if (mob !== "" && !/^(\+?963|00963)9[0-9]{8}$/.test(mob)) {
    alert("الموبايل بالصيغة: +9639XXXXXXXX");
    return false;
  }

  // البريد
  if (mail !== "" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
    alert("البريد الإلكتروني غير صحيح.");
    return false;
  }

  return true;
}
