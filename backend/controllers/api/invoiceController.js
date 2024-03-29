import Estate from "../../db/models/estate.js";
import EstateInvoice from "../../db/models/estateInvoice.js";
import path from "path";

class InvoiceController {
    async saveInvoice(request, response) {
        if(request.files === null) {
            return response.status(400).json({message: "Nie znaleziono plików."});
        }
        let estate, estateToCheckPermissions, invoice, file;
        const data = request.body;
        const id = request.params.id.trim();
        const requestQuery = request.query;

        const datePoland = new Date();
        datePoland.setHours(datePoland.getHours() + 1);

        try {

            estate = await Estate.findOne({_id: id})

            estateToCheckPermissions = await Estate.findOne({_id: id})
                .populate("person", ["_id", "name", "phone_number"])
                .populate("renter", ["_id", "name", "phone_number"]);

            if(requestQuery.typeView && requestQuery.typeView === 'edit') {
                if (estateToCheckPermissions.person._id.toString() === requestQuery.personID) {
                } else {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            } else if (requestQuery.typeView && requestQuery.typeView === 'view') {
                if (estateToCheckPermissions.person._id.toString() === requestQuery.personID || estateToCheckPermissions.renter.find((person) => person._id.toString() === requestQuery.personID)) {
                } else {
                    return response.status(403).json("Nie masz uprawnień do przeglądania tej nieruchomości!");
                }
            }

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
                created_at: datePoland,
                updated_at: datePoland,
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

        const datePoland = new Date();
        datePoland.setHours(datePoland.getHours() + 1);

        try {
            const invoice = await EstateInvoice.findOne({ _id: id });
            if (invoice) {
                invoice.paid_renters = [...invoice.paid_renters, data.person_id];
                invoice.updated_at = datePoland;

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

        const datePoland = new Date();
        datePoland.setHours(datePoland.getHours() + 1);

        try {
            const invoice = await EstateInvoice.findOne({ _id: id });
            if (invoice) {
                invoice.status = false;
                invoice.updated_at = datePoland;

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
