export interface HomeAd {
  id: number;
  isRented: boolean;
  location: string;
  squareMeters: number;
  numberOfRooms: number;
  floorNumber: number;
  heating: string;
  balcony: boolean;
  photoUrl: string;
  mapCoordinates: number;
  price: number;
  createdAt: string;
}
