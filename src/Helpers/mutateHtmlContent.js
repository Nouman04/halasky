const fs = require('fs');
const {JSDOM} = require('jsdom');

const saveBase64Image = (base64Data , fileName , filePath) => {
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
        throw new Error('Invalid base64 image format');
    }
    const imageType = matches[1];
    const imageData = matches[2];
    const extension = imageType.split('/')[1];
    const fileLocation = `${filePath}/${fileName}-blog-image.${extension}`;
    fs.writeFileSync( fileLocation , Buffer.from(imageData , 'base64'));
    const pathIndex = fileLocation.indexOf('public/');
    return fileLocation.substring(pathIndex);

}

const mutateHtmlContent = (content , filePath)=>{
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');

    images.forEach((img , index)=>{
        const src = img.getAttribute('src');
        if(src && src.startsWith('data:image')){
            const fileName = `img-${Date.now()}-${index}`;
            const imageUrl = saveBase64Image(src , fileName , filePath);
            img.setAttribute('src' , imageUrl);
        }
    });

    const updatedContent = document.documentElement.outerHTML;

    return updatedContent;
}

module.exports = mutateHtmlContent;