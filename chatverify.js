(function() {
  const container = document.createElement("div");
  container.id = "chatVerifyWidget";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.width = "320px";
  container.style.height = "420px";
  container.style.background = "#fff";
  container.style.border = "2px solid #ccc";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  container.innerHTML = `
    <div style="flex:1;overflow-y:auto;padding:15px;display:flex;flex-direction:column;" id="chatBox">
      <div class="chat-message bot" style="background:#e3f2fd;padding:10px;border-radius:8px;max-width:80%;align-self:flex-start;">Druk op de groene knop om te verifiëren.</div>
    </div>
    <div style="background:#ddd;padding:10px;text-align:center;border-top:2px solid #ccc;">
      <p style="margin:0;font-size:13px;">Je kunt hier geen berichten sturen.</p>
    </div>
  `;

  const chatBox = container.querySelector("#chatBox");
  const verifyButton = document.createElement("button");
  verifyButton.textContent = "Verifiëren";
  Object.assign(verifyButton.style, {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-start",
    marginTop: "10px"
  });
  verifyButton.onclick = () => {
    const userMsg = document.createElement('div');
    userMsg.textContent = "Ik wil verifiëren.";
    Object.assign(userMsg.style, {
      background: "#c8e6c9",
      padding: "10px",
      borderRadius: "8px",
      alignSelf: "flex-end",
      marginTop: "8px",
      maxWidth: "80%"
    });
    chatBox.appendChild(userMsg);

    const typing = document.createElement('div');
    typing.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    Object.assign(typing.style, {
      background: "#e3f2fd",
      padding: "10px",
      borderRadius: "8px",
      alignSelf: "flex-start",
      marginTop: "8px",
      maxWidth: "80%"
    });
    chatBox.appendChild(typing);

    const style = document.createElement("style");
    style.textContent = `
      .typing {width:30px;display:flex;justify-content:space-between;}
      .typing span {width:6px;height:6px;background:#555;border-radius:50%;animation:blink 1.4s infinite both;}
      .typing span:nth-child(2){animation-delay:0.2s;}
      .typing span:nth-child(3){animation-delay:0.4s;}
      @keyframes blink{0%,80%,100%{opacity:0;}40%{opacity:1;}}
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      typing.remove();
      const botMsg = document.createElement('div');
      botMsg.innerHTML = `
        <p>Verifieer hieronder om door te gaan:</p>
        <div class="h-captcha" data-sitekey="53547320-c03a-475c-97cc-d200bac8f810" data-callback="onVerified"></div>
      `;
      Object.assign(botMsg.style, {
        background: "#e3f2fd",
        padding: "10px",
        borderRadius: "8px",
        alignSelf: "flex-start",
        marginTop: "8px",
        maxWidth: "80%"
      });
      chatBox.appendChild(botMsg);

      if (window.hcaptcha) {
        hcaptcha.render(botMsg.querySelector(".h-captcha"));
      } else {
        const s = document.createElement("script");
        s.src = "https://js.hcaptcha.com/1/api.js";
        document.body.appendChild(s);
      }
    }, 1800);
  };
  chatBox.appendChild(verifyButton);

  window.onVerified = function() {
    const verifiedMsg = document.createElement('div');
    verifiedMsg.textContent = "Verificatie voltooid! Je wordt doorgestuurd...";
    Object.assign(verifiedMsg.style, {
      background: "#e3f2fd",
      padding: "10px",
      borderRadius: "8px",
      alignSelf: "flex-start",
      marginTop: "8px",
      maxWidth: "80%"
    });
    chatBox.appendChild(verifiedMsg);
    setTimeout(() => {
      window.location.href = "https://google.com";
    }, 2000);
  };
})();
