FROM mcr.microsoft.com/dotnet/aspnet:3.1
COPY bin/Publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "aspnetapp.dll"]