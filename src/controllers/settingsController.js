const { About, Setting, AboutImage } = require("../database/models");
const fs = require("fs");
const path = require("path");

module.exports = {
  updateSetting: async (request, response) => {
    try {
      let {
        primaryColor,
        secondaryColor,
        thirdColor,
        fourthColor,
        fifthColor,
        primaryFont,
        secondaryFont,
      } = request.body;

      console.log("Received Request Body:", request.body);
      let settingDetail = await Setting.findOne();
      let settingInformation = {
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        third_color: thirdColor,
        fourth_color: fourthColor,
        fifth_color: fifthColor,
        primary_font: primaryFont,
        secondary_font: secondaryFont,
      };
      if (settingDetail) {
        await Setting.update(settingInformation, { where: { id: 1 } });

        return response.status(200).json({
          status: true,
          message: "Setting information updated successfully",
        });
      }

      await Setting.create(settingInformation);
      return response.status(200).json({
        status: true,
        message: "Setting information added successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  updateAboutInformation: async (request, response) => {
    try {
      let upperContent = request.body.upperContent;
      let lowerContent = request.body.lowerContent;
      let aboutInformation = {
        upper_content: upperContent,
        lower_content: lowerContent,
      };

      const aboutImagePath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "about"
      );
      let aboutDetail = await About.findOne({
        include: { model: AboutImage, as: "images", required: false },
      });

      if (aboutDetail) {
        await About.update(aboutInformation, { where: { id: aboutDetail.id } });

        if (request.files && request.files.length > 0) {
          aboutDetail.images.forEach((image) => {
            let filePath = path.join(aboutImagePath, image.image);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          });

          // Insert new image records
          let imagesInformation = request.files.map((file) => ({
            content_id: aboutDetail.id,
            image: file.filename, // Correctly extract filename
          }));

          await AboutImage.bulkCreate(imagesInformation);
        }

        return response.status(200).json({
          status: true,
          message: "About information updated successfully",
        });
      }

      let newAbout = await About.create(aboutInformation);

      if (request.files && request.files.length > 0) {
        let imagesInformation = request.files.map((file) => ({
          content_id: newAbout.id,
          image: file.filename,
        }));

        await AboutImage.bulkCreate(imagesInformation);
      }

      return response.status(200).json({
        status: true,
        message: "About information updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  getSettings: async (request, response) => {
    try {
      let settings = await Setting.findOne();

      return response.status(200).json({
        status: true,
        data: settings,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  getAboutSettings: async (request, response) => {
    try {
      let settings = await About.findOne({
        include: { model: AboutImage, as: "images", required: false },
      });

      return response.status(200).json({
        status: true,
        data: settings,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },
};
