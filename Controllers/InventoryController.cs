using Hartic.Data;
using Hartic.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hartic.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IFurnitureRepository _repository;

        public InventoryController(IFurnitureRepository repository, ILogger<InventoryController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public IEnumerable<Furniture> Get()
        {
            return _repository.GetFurniture() ?? new Furniture[0];
        }
    }
}
