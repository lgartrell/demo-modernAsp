using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowLocalhostReactServer",
       builder =>
       {
          builder.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
       });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowLocalhostReactServer");

// Enable swagger in dev environments
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// To serve the react SPA index.html we need to include the static built folder in our web server's context
string currentDirectory = Directory.GetCurrentDirectory();
string clientBuildPath = Path.Combine(currentDirectory, "Client", "build");
string spaRoot = Path.Combine(clientBuildPath, "index.html");

// If client directory is not found, we can debug the path issues here
if (!Directory.Exists(clientBuildPath))
{
   throw new Exception("Client build directory does not exist");
}

// Declare routing, authorization pipeline, and then finally spa root
app.UseHttpsRedirection();

// SPA entrypoint declaration
app.UseStaticFiles(new StaticFileOptions
{
   FileProvider = new PhysicalFileProvider(clientBuildPath),
   RequestPath = "",
});

app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
   endpoints.MapControllers();

});

app.MapFallback(context =>
{
   context.Response.ContentType = "text/html";
   return context.Response.SendFileAsync(Path.Combine(clientBuildPath, "index.html"));
});

app.Run();