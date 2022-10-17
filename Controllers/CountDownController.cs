using Hartic.Data;
using Hartic.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Hartic.Controllers
{
    //[ApiController]
    [Route("[controller]")]
    public class CountDownController : ControllerBase
    {
        private readonly ICountDownRepository _repository;
        private readonly ILogger _logger;
        public CountDownController(ICountDownRepository repository, ILogger<CountDownController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost]
        public IActionResult Start()
        {
            try
            {
                return Ok(_repository.Start());
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public IActionResult Stop([FromBody]int clientId)
        {
            try
            {
                _repository.Stop(clientId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal server error");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
