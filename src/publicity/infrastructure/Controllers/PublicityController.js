"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalFileStorage_1 = require("../adapters/storages/LocalFileStorage");
const S3FileStorage_1 = require("../adapters/storages/S3FileStorage");
const localFileStorage = new LocalFileStorage_1.LocalFileStorage();
const s3FileStorage = new S3FileStorage_1.S3FileStorage();
class PublicityController {
    constructor(getAllPublicityUseCase, createPublicityUserCase, getByIdPublicityUseCase, updatePublicityUseCase, deletePublicityUseCase) {
        this.getAllPublicityUseCase = getAllPublicityUseCase;
        this.createPublicityUserCase = createPublicityUserCase;
        this.getByIdPublicityUseCase = getByIdPublicityUseCase;
        this.updatePublicityUseCase = updatePublicityUseCase;
        this.deletePublicityUseCase = deletePublicityUseCase;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicationPayload = req.body;
                const file = req.file;
                if (!file) {
                    return res.status(400).send("No file uploaded");
                }
                // Guardar archivo localmente
                const localFilePath = yield localFileStorage.uploadFile(file);
                // Subir imagen a S3
                const s3FilePath = yield s3FileStorage.uploadFile(file);
                const publicationData = Object.assign(Object.assign({}, publicationPayload), { image: localFilePath, image_s3: s3FilePath });
                const publication = yield this.createPublicityUserCase.execute(publicationData);
                res.status(201).json(publication);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Publicacion creada con exito");
                }
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield this.getAllPublicityUseCase.execute();
                res.json(publications);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publication = yield this.getByIdPublicityUseCase.run(req.params.id);
                res.json(publication);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicationId = req.params.id;
                const publicationPayload = req.body;
                const file = req.file;
                // Obtener la publicación existente
                const existingPublication = yield this.getByIdPublicityUseCase.run(publicationId);
                if (!existingPublication) {
                    return res.status(404).send("Publication not found");
                }
                // Eliminar imagen antigua si existe una nueva
                if (file) {
                    yield localFileStorage.deleteFile(existingPublication.image);
                    yield s3FileStorage.deleteFile(existingPublication.image_s3);
                    // Guardar archivo localmente
                    const localFilePath = yield localFileStorage.uploadFile(file);
                    // Subir imagen a S3
                    const s3FilePath = yield s3FileStorage.uploadFile(file);
                    publicationPayload.image = localFilePath;
                    publicationPayload.image_s3 = s3FilePath;
                }
                const updatedPublication = yield this.updatePublicityUseCase.execute(publicationId, publicationPayload);
                res.json(updatedPublication);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Publicacion creada con exito");
                }
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicationId = req.params.id;
                // Obtener la publicación existente
                const existingPublication = yield this.getByIdPublicityUseCase.run(publicationId);
                if (!existingPublication) {
                    return res.status(404).send("Publication not found");
                }
                // Eliminar imagen de S3
                yield s3FileStorage.deleteFile(existingPublication.image_s3);
                // Eliminar imagen del almacenamiento local
                yield localFileStorage.deleteFile(existingPublication.image);
                const result = yield this.deletePublicityUseCase.execute(publicationId);
                res.status(result ? 200 : 404).json({ success: result });
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Publicacion creada con exito");
                }
            }
        });
    }
}
exports.default = PublicityController;
