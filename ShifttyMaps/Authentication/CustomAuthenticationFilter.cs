﻿using System;  
using System.Web.Mvc;  
using System.Web.Mvc.Filters;  
using System.Web.Routing; 

namespace ShifttyMaps.Authentication
{
    public class CustomAuthenticationFilter: ActionFilterAttribute, IAuthenticationFilter  
    {  
        public void OnAuthentication(AuthenticationContext filterContext)  
        {  
            if (string.IsNullOrEmpty(Convert.ToString(filterContext.HttpContext.Session["UserId"])))  
            {  
                filterContext.Result = new HttpUnauthorizedResult();  
            }  
        }  
        public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)  
        {  
            if (filterContext.Result == null || filterContext.Result is HttpUnauthorizedResult)  
            {  
                //Redirecting the user to the Login View of Account Controller  
                filterContext.Result = new RedirectToRouteResult(  
                new RouteValueDictionary  
                {  
                     { "controller", "Login" },  
                     { "action", "Index" }  
                });  
            }  
        }  
    }  
}