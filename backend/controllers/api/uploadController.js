import * as path from "path";

class UploadController {
    async saveImage(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }

        const file = request.files.file;
        console.log(request.files)

        const __dirname = path.resolve();
        const pathDirectory = `${__dirname}/../frontend/public/uploads/pictures/${file.name}`;

        await file.mv(pathDirectory, (err) => {
            if (err) {
                console.error(err);
                return response.status(500).send(err);
            }

            response.json({fileName: file.name, filePath: `/uploads/${file.name}`});
        })
    }
}

export default new UploadController();
