import * as path from "path";

class UploadController {
    async saveImage(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }

        let i;

        const file = request.files.file;

        // console.log(' ')
        // console.log(file)
        // console.log(' ')
        //
        // console.log("body: ",request.body)
        //
        // console.log("-----")

        console.log(file.name.slice(-4))
        if(file.name.slice(-4).includes('.png') || file.name.slice(-4).includes('.jpg') || file.name.slice(-4).includes('.jpeg')) {
            const __dirname = path.resolve();
            const pathDirectory = `${__dirname}/../frontend/public/uploads/pictures/${file.name}`;

            await file.mv(pathDirectory, (err) => {
                if (err) {
                    console.error(err);
                    return response.status(500).send(err);
                }

                response.status(200).json({fileName: file.name, filePath: `/uploads/${file.name}`});
            })

            // here dalej...
        } else {
            return response.status(400).json({message: "Zdjęcie powinno być w formacie png, jpg lub jpeg."});

        }


    }

    async saveInvoice(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }

        let i;

        const file = request.files.file;

        console.log(file.name.slice(-4))
        if(file.name.slice(-4).includes('.pdf')) {
            return console.log("ok")
        } else {
            return console.log("nie")
        }

        console.log("body: ",request.body)

        const __dirname = path.resolve();
        const pathDirectory = `${__dirname}/../frontend/public/uploads/invoices/${file.name}`;

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
