namespace Auth.API.Model
{
    public class ResponseAccessToken
    {
        public ResponseAccessToken(string value)
        {
            Value = value;
        }

        public string Value { get; set; }
        
        
    }
}