using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace demo_modernAsp.Controllers
{
   [Route("api/appointments")]
   [ApiController]
   public class AppointmentsController : ControllerBase
   {
      private readonly IConfiguration _config;

      public AppointmentsController(IConfiguration config)
      {
         _config = config;
      }

      [HttpGet("demo-data")]
      public async Task<IActionResult> GetDemoAppointmentData()
      {
         // controller method is declared async to await the external resource web request

         string url = _config["DemoEndpointUrl"];

         if (string.IsNullOrEmpty(url))
         {
            return BadRequest("Demo endpoint is not configured");
         }

         // this is a .NET 6.0 project, new using declaration syntax
         // .Dispose() is called on the client automatically when the variable is out of scope (end of this method)
         using HttpClient client = new();

         var response = await client.GetAsync(url);

         var json = await response.Content.ReadAsStringAsync();

         if (response.IsSuccessStatusCode)
            return Content(json, "application/json");

         // if not successful, pass along error code & message
         return StatusCode((int)response.StatusCode, response.ReasonPhrase);
      }
   }
}
