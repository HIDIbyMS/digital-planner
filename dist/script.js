const dropboxLink = "https://www.dropbox.com/s/yoa1iioz3y082kc/1.PAGE.DIGITALPLANNER.ONE.PAGE.VERSION.pdf?dl=0";
const clientID = "8d339aba7f1d4bb192eb9cd817524da3";
const viewerOptions = {
    embedMode: "FULL_WINDOW",
    defaultViewMode: "FIT_PAGE",
    showDownloadPDF: false,
    showPrintPDF: false,
    showLeftHandPanel: true,
    showAnnotationTools: true
};

let btn = document.querySelector('button.pdfActivate')

// PDF API Initialization
document.addEventListener("adobe_dc_view_sdk.ready", function () {
  var urlToPDF = directLinkFromDropboxLink(dropboxLink);
  console.log('adobe_dc_view_sdk.ready')
  btn.disabled = false;

  let adobeDCView = new AdobeDC.View({
    clientId: clientID,
    divId: "adobe-dc-view" 
//     divId: "embeddedView"
  });
  // Wrap in function to call when needed
  const displayPDF = () => {
    // Prevent additional PDF button clicks
    btn.disabled = true;

    // Create PDF preview
    adobeDCView.previewFile({
            content: { promise: fetchPDF(urlToPDF) },
            metaData: { fileName: urlToPDF.split("/").slice(-1)[0] }
        },
        viewerOptions
    );
});

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
