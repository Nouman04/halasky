const Setting = require('../database/models/Setting');
const About = require('../database/models/About');
const AboutImage = require('../database/models/About');
const dynamicUploader = require('../Helpers/fileUploadHelper');

module.exports = {
    updateSetting : async (request, response) => {
        try{

            let {primaryColor , secondaryColor , thirdColor , fourthColor , fifthColor , primaryFont , secondaryFont} = request.body
            let settingDetail = Setting.findOne();
            let settingInformation = {
                                        primary_color : primaryColor,
                                        secondary_color : secondaryColor,
                                        third_color : thirdColor,
                                        fourth_color : fourthColor,
                                        fifth_color : fifthColor,
                                        primary_font : primaryColor,
                                        secondary_color : secondaryColor
                                    }
            if(settingDetail){
                await Setting.update(
                    { where : {id : 1}}, 
                    settingInformation
                );

                return response.status(200).json({
                    status : true, message : 'Setting information updated successfully'
                })
            }
            
            await Setting.create( settingInformation )
            return response.status(200).json({
                status : true, message : 'Setting information added successfully'
            });

        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }

    }, 
    
    updateAboutInformation : async (request , response ) => {
        try{
            
            let upperContent = request.body.upperDescription;
            let lowerContent = request.body.lowerContent;
            let aboutInformation = {
                upper_content : upperContent,
                lower_content : lowerContent
            };
            const aboutImagePath = path.join(__dirname,'..','public','uploads','about' );
            let aboutDetail = About.findOne({ include : { model : AboutImage , as : 'images' , required: false}});
            let imagesInformation = [];
            if(aboutDetail){
               About.update(
                {where : {id : aboutDetail.id} },
                aboutInformation
               ) 

                if(request.file && count(request.file.images)){
                    aboutDetail.images.forEach( image => {
                        if(fs.existsSync(`${aboutImagePath}/${image}`)){
                            fs.unlinkSync(`${aboutImagePath}/${image}`);
                        }
                    })

                    
                    let AboutImageUpload = upload.array('images');
                    await new Promise((resolve , reject) => {
                        AboutImageUpload(request , response , (err) => {
                            if(err) {
                                return reject(err);
                            } 

                            resolve();
                        })
                    });
                    
                    request.body.images.forEach(imageDetail => {
                        imagesInformation.push({content_id : aboutDetail.id , image : imageDetail.upload});
                    })
                    
                    AboutImage.bulkInsert(imagesInformation);

                }

                return response.status(200).json({
                    status : true,
                    message : 'About information updated successfully';
                });

            }


            About.create( aboutInformation ); 

            if(request.file && count(request.file.images)){
                
                let AboutImageUpload = upload.array('images');
                await new Promise((resolve , reject) => {
                    AboutImageUpload(request , response , (err) => {
                        if(err) {
                            return reject(err);
                        } 

                        resolve();
                    })
                });
                

                let imagesInformation = [];
                request.body.images.forEach(imageDetail => {
                    imagesInformation.push({content_id : aboutDetail.id , image : imageDetail.upload});
                })
                
                AboutImage.bulkInsert(imagesInformation);
            }

            return response.status(200).json({
                status : true,
                message : 'About information added successfully'
            });
        } catch (error){
            return response.status(500).json({
                status: false,
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    },

   
}