/*--[ SM Post Buy Now Pdf ]--*/

      function updatePaymentNumber() {
      const paymentMethod = document.getElementById("payment-method").value;
      const paymentNumber = paymentMethod === "bkash" ? "+8801676110991" : "+8801676110991";
      document.getElementById("payment-number").value = paymentNumber;
    }

  
function generatePDF(orderData) {
    const pdfContent = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6; max-width: 600px; margin: auto;">
        <h1 style="text-align: center; color: #4CAF50;">SM Team World - Order Confirmation</h1>
        <p style="text-align: center;">Thank you for placing your order with us!</p>
        <hr style="margin: 20px 0;">
        <h2 style="color: #333;">Order Details:</h2>
        <p><strong>📦 Product Name:</strong> ${orderData.productName}</p>
        <p><strong>💵 Price:</strong> ${orderData.productPrice}</p>
        <p><strong>🔢 Product Code:</strong> ${orderData.productCode}</p>
        <hr style="margin: 20px 0;">
        <h2 style="color: #333;">Customer Information:</h2>
        <p><strong>👤 Your Name:</strong> ${orderData.userName}</p>
        <p><strong>📧 Your Email:</strong> ${orderData.userEmail}</p>
        <p><strong>💳 Payment Method:</strong> ${orderData.paymentMethod}</p>
        <p><strong>📞 Payment Number:</strong> ${orderData.paymentNumber}</p>
        <p><strong>📱 Your Phone:</strong> ${orderData.userPhone}</p>
        <p><strong>🆔 Transaction ID:</strong> ${orderData.transactionId}</p>
        <hr style="margin: 20px 0;">

        <!-- New Section Added Here -->
<div style="padding: 15px; text-align: center; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 10px;">
  <p style="font-size: 18px; color: #333; margin: 0;"><strong>Welcome to SM Team World</strong></p>
  <p style="margin: 5px 0;">Simplify your tasks with our smart virtual assistant services. Save time, stay productive!</p>
  <a href="https://www.smteamworld.top" style="display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">Learn More</a>
</div>
        <!-- End of New Section -->

        <footer style="text-align: center; color: #777; margin-top: 5px;">
          <span>Powered by <strong>SM Team World</strong></span> │ <span>Visit us: <a href="https://www.smteamworld.top" target="_blank">www.smteamworld.top</a></span>
        </footer>
    `;

    const options = {
      filename: `Order_${orderData.productCode}.pdf`,
      margin: 1,
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        encryption: {
          userPassword: "", // ইউজারের জন্য কোনো পাসওয়ার্ড প্রয়োজন নেই।
          ownerPassword: "owner123", // মালিকের জন্য পাসওয়ার্ড।
          permissions: { 
            modify: false, // এডিটিং নিষিদ্ধ।
            copy: true, // কপি করার অনুমতি।
            print: false // প্রিন্টিং নিষিদ্ধ।
          }
        }
      }
    };

    const element = document.createElement("div");
    element.innerHTML = pdfContent;

    html2pdf().set(options).from(element).toPdf().get('pdf').then((pdf) => {
      pdf.save(options.filename);
    });
  }

  // Submit order function
  function submitOrder(event) {
    event.preventDefault();

    const orderData = {
      productName: document.getElementById("product-name-field").value,
      productPrice: document.getElementById("product-price-field").value,
      productCode: document.getElementById("product-code-field").value,
      userName: document.getElementById("user-name").value,
      userEmail: document.getElementById("user-email").value,
      paymentMethod: document.getElementById("payment-method").value,
      paymentNumber: document.getElementById("payment-number").value,
      userPhone: document.getElementById("user-phone").value,
      transactionId: document.getElementById("transaction-id").value
    };

    if (Object.values(orderData).includes("")) {
      alert("Please fill out all required fields.");
      return;
    }

    const telegramMessage = `\
📝 *Order Confirmation By SM TEAM World*\
\n📦 *Product Name:* ${orderData.productName}\
\n💵 *Price:* ${orderData.productPrice}\
\n🔢 *Product Code:* ${orderData.productCode}\
\n👤 *Your Name:* ${orderData.userName}\
\n📧 *Your Email:* ${orderData.userEmail}\
\n💳 *Payment Method:* ${orderData.paymentMethod}\
\n📞 *Payment Number:* ${orderData.paymentNumber}\
\n📱 *Your Phone:* ${orderData.userPhone}\
\n🆔 *Transaction ID:* ${orderData.transactionId}\
`;

    const telegramUrl = `https://api.telegram.org/bot7530296292:AAFO1a2hXmt45pEl4vAvhXT6bDnEEERqNUA/sendMessage?chat_id=-1002493368052&text=${encodeURIComponent(telegramMessage)}&parse_mode=Markdown`;
    fetch(telegramUrl)
      .then(response => response.json())
      .then(() => {
        alert("Order Confirmed! PDF file will download automatically.");
        generatePDF(orderData); // Generate the PDF after successful Telegram message
        setTimeout(() => {
          window.location.href = "https://smteamworldnow.blogspot.com";
        }, 5000);
      })
      .catch(error => console.error("Error:", error));
  }

  window.onload = function() {
    document.getElementById("product-name-field").value = localStorage.getItem("productName");
    document.getElementById("product-price-field").value = localStorage.getItem("productPrice");
    document.getElementById("product-code-field").value = localStorage.getItem("productCode");
  };

/*--[ SM wc-fs PopUp v1.9 ]--*/
  const popup = document.getElementById("wc-fs");
  const clock = document.getElementById("clock");
  const flashSaleTime = "December 24, 2024 23:59:59"; // Countdown deadline
  const popupDelay = 3000; // Show popup after 3 seconds
  const redirectLink = "https://example.com"; // "Shop Now" link
  const newTab = true; // Open in new tab or same tab

  function showPopup() {
    popup.classList.add("show");
    startCountdown(flashSaleTime);
  }

  function closePopup() {
    popup.classList.remove("show");
  }

  function openLink() {
    if (newTab) {
      window.open(redirectLink, "_blank");
    } else {
      window.location.href = redirectLink;
    }
  }

  function startCountdown(endTime) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = new Date(endTime).getTime() - now;

      if (distance < 0) {
        clearInterval(countdown);
        clock.innerHTML = "<p>Promo Ended!</p>";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days < 10 ? "0" + days : days;
      hoursEl.textContent = hours < 10 ? "0" + hours : hours;
      minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    updateCountdown();
    const countdown = setInterval(updateCountdown, 1000);
  }

  // Show popup after delay
  setTimeout(showPopup, popupDelay);

