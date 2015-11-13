using LinqToTwitter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TwitterAPI.Constantes;

namespace TwitterAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/twitter")]
    public class TwitterController : ApiController
    {
        // GET api/Account/UserInfo
        [AllowAnonymous]
        [Route("tweets/{query}/{count}")]
        public IHttpActionResult GetUserInfo(string query, int count = 20, string resultType = "recent", string language = null, string geo = null)
        {
            try
            {
                var auth = new ApplicationOnlyAuthorizer
                {
                    CredentialStore = new SingleUserInMemoryCredentialStore
                    {
                        ConsumerKey = TwitterKeys.consumerKey,
                        ConsumerSecret = TwitterKeys.consumerSecret,
                        AccessToken = TwitterKeys.accessToken,
                        AccessTokenSecret = TwitterKeys.accessTokenSecret
                    }
                };

                var authSync = auth.AuthorizeAsync();
                authSync.Wait();

                var twitterCtx = new TwitterContext(auth);

                var resultadoBusca = (from search in twitterCtx.Search
                                      where search.Type == SearchType.Search &&
                                            search.Query == query &&
                                            search.Count == count &&
                                            search.ResultType == ResultType.Recent &&
                                            search.SearchLanguage == "pt"
                                      select search)
                                     .ToList();

                return Ok(resultadoBusca[0].Statuses);
            }
            catch (Exception ex)
            {
                throw new Exception("Não conseguimos processar a requisição. Por favor verifique a conexão com a internet ou tente mais tarde.");
            }
        }
    }
}
