// Exceptions
import { HttpException } from "@exceptions/HttpException";

// Models
import realEstateNftModel from "@models/realEstateNft.model";

// Interfaces
import { RealEstateNFTMetadata } from "@interfaces/realEstateNft.interface";

// DTO
import { CreateRealEstateNftDto } from "@dtos/realEstateNft.dto";

// Utils
import { isEmpty } from "@utils/util";
import BigNumber from "bignumber.js";

// configure BigNumber constructor
BigNumber.config({ DECIMAL_PLACES: 2 });

class PropertyService {
  public async createRealEstateNft(createRealEstateNftBody: CreateRealEstateNftDto) {
    if (isEmpty(createRealEstateNftBody)) throw new HttpException(400, "createRealEstateNftBody is empty");

    const findOne = await realEstateNftModel.findById(createRealEstateNftBody.id);
    if (findOne) throw new HttpException(409, "Real Estate NFT already exists");

    const createRealEstateNftData = await realEstateNftModel.create(createRealEstateNftBody);

    return createRealEstateNftData;
  }

  public async getRealEstateNftById(realEstateNftId: string): Promise<RealEstateNFTMetadata> {
    if (isEmpty(realEstateNftId)) throw new HttpException(400, "realEstateNftId is empty");

    const realEstateNft = (await realEstateNftModel.findById(realEstateNftId)).toJSON();
    if (!realEstateNft) throw new HttpException(409, "Property doesn't exist");

    delete realEstateNft._id;
    return realEstateNft;
  }
}

export default PropertyService;
