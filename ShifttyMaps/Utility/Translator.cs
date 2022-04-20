using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;

namespace ShifttyMaps.Utility
{
    public class Translator
    {
        public static TDestination TranslateObject<TSource,TDestination>(TSource source)
        {

            try
            {
                if (source == null)
                    throw new ArgumentNullException("Model object is null");

                TDestination target = (TDestination)Activator.CreateInstance(typeof(TDestination));

                Type sourceType = source.GetType();

                List<PropertyInfo> sourceProperties = sourceType.GetProperties().ToList();

                foreach (PropertyInfo property in sourceProperties)
                {
                    if (!property.PropertyType.IsClass || property.PropertyType.IsPrimitive || property.PropertyType.Name == typeof(String).Name)
                    {
                        PropertyInfo targetPropertyToSet = target.GetType().GetProperty(property.Name);

                        if (targetPropertyToSet == null)
                            continue;

                        targetPropertyToSet.SetValue(target, property.GetValue(source, null), null);
                    }
                }

                return target;
            }
            catch (Exception ex)
            {                
                throw ex;
            }     

        }

        public static List<TDestination> TranslateList<TSource, TDestination>(List<TSource> source)
        {
            if (source == null)
                throw new ArgumentNullException("Model object is null");

            List<TDestination> list = new List<TDestination>();

            foreach (var item in source)
            {
                TDestination objTarget = Translator.TranslateObject<TSource,TDestination>(item);

                list.Add(objTarget);
            }

            return list;
        }

    }
}