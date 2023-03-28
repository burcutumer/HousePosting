using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Entities
{
    [Table("HomeAds")]
    public class HomeAd
    {
        public int Id { get; set; }
        public bool IsRented { get; set; }
        public string Location { get; set; } = null!;
        public int SquareMeters { get; set; }
        public int NumberOfRooms { get; set; }
        public int FloorNumber { get; set; }
        public string Heating { get; set; } = null!;
        public bool Balcony { get; set; }
        public string PhotoUrl { get; set; } = null!;
        public double MapCoordinates { get; set; }
        public int Price { get; set; }
        public DateTime CreatedAt { get; set; }
        public int  AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}