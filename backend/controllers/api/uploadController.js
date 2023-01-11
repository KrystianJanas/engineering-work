import * as path from "path";
import Announcement from "../../db/models/announcement.js";

class UploadController {
    async saveImage(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }
        const id = request.params.id.trim();
        const file = request.files.file;
        const data = request.body;

        if(file.name.slice(-4).includes('.png') || file.name.slice(-4).includes('.jpg') || file.name.slice(-5).includes('.jpeg')) {

            let fullName;
            if(file.name.slice(-4).includes('.png')) {
                fullName = `${id}_${data.datetime}_${file.size}.png`
            } else if (file.name.slice(-4).includes('.jpg')) {
                fullName = `${id}_${data.datetime}_${file.size}.jpg`
            } else if (file.name.slice(-5).includes('.jpeg')) {
                fullName = `${id}_${data.datetime}_${file.size}.jpeg`
            }

            const __dirname = path.resolve();
            const pathDirectory = `${__dirname}/../frontend/public/uploads/pictures/${fullName}`;

            await file.mv(pathDirectory, (err) => {
                if (err) {
                    console.error(err);
                    return response.status(500).send(err);
                }
            })

            const datePoland = new Date();
            datePoland.setHours(datePoland.getHours() + 1);

            const announcement = await Announcement.findOne({ _id: id });
            if (announcement) {
                announcement.images = [...announcement.images, fullName];

                announcement.updated_at = datePoland;

                await announcement.save();
                response.status(200).json(announcement);
            } else {
                return response.status(422).json({ message: "Ogłoszenie nie zostało znalezione."});
            }

            // here dalej...
        } else {
            return response.status(400).json({message: "Zdjęcie powinno być w formacie png, jpg lub jpeg."});

        }
    }
}

export default new UploadController();
