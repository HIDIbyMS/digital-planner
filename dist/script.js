const clientID = "8d339aba7f1d4bb192eb9cd817524da3";
let btn = document.querySelector('button.pdfActivate')

// PDF API Initialization
document.addEventListener("adobe_dc_view_sdk.ready", function () {
  console.log('adobe_dc_view_sdk.ready')
  btn.disabled = false;

  let adobeDCView = new AdobeDC.View({
    clientId: clientID,
    divId: "adobe-dc-view"
  });
  // Wrap in function to call when needed
  const displayPDF = () => {
    // Prevent additional PDF button clicks
    btn.disabled = true;

    // Create PDF preview
    adobeDCView.previewFile({
      content: {location: {url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
      metaData: { fileName: "Bodea Brochure.pdf" }
    }, {});

    // Animate PDF viewer & PDF
    let pdfTL = gsap.timeline({})
    pdfTL.to('#adobe-dc-view', {opacity:1, duration:0.125})
    pdfTL.fromTo('#adobe-dc-view', {height:'0'}, {height:'37.5rem', duration:0.5})
    pdfTL.to('#adobe-dc-view iframe', {opacity:1, duration:0.25})
  }

  // Button listener
  btn.addEventListener('click', function() {
    displayPDF()
    console.log('clicked')
  });
});
