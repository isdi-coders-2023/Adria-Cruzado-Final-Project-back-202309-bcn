import Hotel from "../model/Hotel.js";
import { type HotelStructureWithoutId, type HotelStructure } from "../types";
import { type HotelsRepository } from "./types";

class HotelsMongooseRepository implements HotelsRepository {
  public async getHotels(): Promise<HotelStructure[]> {
    const hotels = await Hotel.find().limit(10).sort({ _id: -1 });

    return hotels;
  }

  public async deleteHotel(hotelId: string): Promise<void> {
    await Hotel.deleteOne({ _id: hotelId });
  }

  public async addHotel(
    hotel: HotelStructureWithoutId,
  ): Promise<HotelStructure> {
    try {
      const newHotel = await Hotel.create(hotel);

      return newHotel;
    } catch (error) {
      throw new Error("Error creating the hotel" + (error as Error).message);
    }
  }

  public async getHotelById(id: string): Promise<HotelStructure> {
    try {
      const hotel = await Hotel.findById(id);

      return hotel!;
    } catch (error) {
      throw new Error("Error finding hotel" + (error as Error).message);
    }
  }

  public async modifyHotel(
    id: string,
    hotel: HotelStructure,
  ): Promise<HotelStructure | undefined> {
    try {
      const modifiedHotel = await Hotel.findByIdAndUpdate(
        id,
        { ...hotel },
        { returnDocument: "after" },
      );

      return modifiedHotel!;
    } catch (error) {
      throw new Error("Error modifying hotel" + (error as Error).message);
    }
  }
}

export default HotelsMongooseRepository;
