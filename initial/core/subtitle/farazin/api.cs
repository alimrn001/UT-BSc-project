var email = "nam_karbari";
var pass = "ramz";
var param = "grant_type=password&username=" + email + "&password=" + pass;

var serializer = new JavaScriptSerializer();
var req = HttpWebRequest.Create("http://www.faraazin.ir/token");
req.ContentType = "application/x-www-form-urlencoded";
req.Method = "POST";

using (var sw = new StreamWriter(req.GetRequestStream()))
{
    sw.Write(param);
}

using (var res = req.GetResponse())
{
    using (var sr = new StreamReader(res.getResposeStream()))
    {
        var json = sr.ReadToEnd();
        var obj = serializer.DeserializeObject(json) as Dictionary<string, object>;
        var access_token = obj["access_token"].ToString();
        var refresh_token = obj["refresh_token"].ToString();
        var expire_in = (int)obj["expire_in"];
    }
}
