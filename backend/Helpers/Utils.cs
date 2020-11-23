using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace backend.Helpers
{
  public static class Utils
  {
    public static string CreateMD5(string input)
    {
      // Use input string to calculate MD5 hash
      using (MD5 md5 = MD5.Create())
      {
        byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
        byte[] hashBytes = md5.ComputeHash(inputBytes);

        // Convert the byte array to hexadecimal string
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hashBytes.Length; i++)
        {
          sb.Append(hashBytes[i].ToString("X2"));
        }
        return sb.ToString();
      }
    }

    public static async Task SaveFile(IFormFile file, string nameFile, string webRootPath) {
      
      string folderName = @"images";
      string filename = $"${nameFile}_{DateTime.Now.Millisecond.ToString()}";

      if (file == null || file.Length == 0) return;

      if (file.FileName.Contains(".jpg"))
          filename += ".jpg";
      else if (file.FileName.Contains(".gif"))
          filename += ".gif";
      else if (file.FileName.Contains(".png"))
          filename += ".png";
      else
          filename += ".tmp";
        
     string finalDestinyFile = $@"{webRootPath}/{folderName}/{filename}";
     
      using (var stream = new FileStream(finalDestinyFile, FileMode.Create))
      {
          await file.CopyToAsync(stream);
      }  
    }
  }
}