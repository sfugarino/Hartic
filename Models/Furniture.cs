using System.ComponentModel.DataAnnotations;

namespace Hartic.Models
{
    public class Furniture
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(50)]
        public string Description { get; set; } = null!;
        public int Count { get; set; }
    }
}
