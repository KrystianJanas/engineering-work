import Announcement from "../../db/models/announcement.js";
import Estate from "../../db/models/estate.js";
import EstateInvoice from "../../db/models/estateInvoice.js";
import path from "path";

class InvoiceController {
    async saveInvoice(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }
        let estate, invoice, file;
        const data = request.body;
        const id = request.params.id.trim();

        try {

            estate = await Estate.findOne({_id: id})
            file = request.files.file;

            const fullName = `${id}_${data.datetime}.pdf`
            const __dirname = path.resolve();
            const pathDirectory = `${__dirname}/../frontend/public/uploads/invoices/${fullName}`;

            await file.mv(pathDirectory, (err) => {
                if (err) {
                    console.error(err);
                    return response.status(500).send(err);
                }
            })

            invoice = new EstateInvoice({
                person: data.person,
                estate: id,
                renters: estate.renter, // here modify
                paid_renters: [],
                invoice_name: fullName,
                description: data.description,
            });
            await invoice.save();

            response.status(200).json({fileName: fullName, filePath: `/uploads/invoices/${fullName}`});


        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async getInvoices(request, response) {
        let invoices;
        const id = request.params.id.trim();

        try {
            invoices = await EstateInvoice.find({ estate: id, status: true }).populate("paid_renters", ['_id', 'name']).sort({created_at: -1});
            response.status(200).json(invoices);

            //
        } catch (error) {
            response.status(500).json({ message: error.message });
        }


    }


    async updatePaymentRenterInvoice(request, response) {
        const id = request.params.id;
        const data = request.body;

        try {
            const invoice = await EstateInvoice.findOne({ _id: id });
            if (invoice) {
                invoice.paid_renters = [...invoice.paid_renters, data.person_id]
                invoice.updated_at = Date.now();

                await invoice.save();
                console.log(invoice)
                response.sendStatus(204);
            } else {
                return response.status(422).json({ message: "Nie znaleziono faktury." });
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async deleteInvoice(request, response) {
        const id = request.params.id;

        try {
            const invoice = await EstateInvoice.findOne({ _id: id });
            if (invoice) {
                invoice.status = false;
                invoice.updated_at = Date.now();

                await invoice.save();
                response.sendStatus(204);
            } else {
                return response.status(404).json({ message: "Nie znaleziono faktury." });
            }
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }

    async downloadInvoice(request, response) {
        const name = request.params.name;

        try {
            const __dirname = path.resolve();
            const pathFile = `${__dirname}/../frontend/public/uploads/invoices/${name}`;

            response.download(pathFile);
        } catch (error) {
            return response.status(422).json({ message: error.message });
        }
    }
}

export default new InvoiceController();
