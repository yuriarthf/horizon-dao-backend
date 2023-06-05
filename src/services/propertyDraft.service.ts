// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import propertyDraftModel from "@/models/propertyDraft.model";

// Utils
import { isEmpty } from "@utils/util";

// Interfaces
import { User } from "@/interfaces/users.interface";

// DTO
import { saveDraftDto } from "@/dtos/propertyDraft.dto";

class PropertyDraftService {
  public async retrieveDraft(user: User) {
    return await propertyDraftModel.findOne({ creator: user.address });
  }

  public async saveDraft(saveDraftBody: saveDraftDto, user: User) {
    if (user.address !== saveDraftBody.creator) throw new HttpException(401, "Creator should be equal to user address");

    if (isEmpty(saveDraftBody)) throw new HttpException(400, "saveDraftBody is empty");

    const findOne = await propertyDraftModel.findOne({ creator: saveDraftBody.creator });
    if (findOne) {
      return await propertyDraftModel.findByIdAndUpdate(findOne.id, saveDraftBody, { new: true });
    }

    return await propertyDraftModel.create(saveDraftBody);
  }
}

export default PropertyDraftService;
