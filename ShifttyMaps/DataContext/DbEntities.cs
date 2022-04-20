using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data;
using Npgsql;

namespace ShifttyMaps.DataContext
{
    public class DbEntities
    {
        NpgsqlConnection con = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        public DataTable GetData(string query)
        {
            DataTable dt = new DataTable();
            con.Open();
            try
            {
                NpgsqlDataAdapter da = new NpgsqlDataAdapter();
                da.SelectCommand = new NpgsqlCommand(query, con);
                da.Fill(dt);
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                con.Close();
            }
            return dt;
        }
        public bool CUD(string query)
        {
            bool result = true;
            con.Open();
            try
            {
                NpgsqlCommand cmd = new NpgsqlCommand(query, con);
                cmd.ExecuteNonQuery();
                result = true;
            }
            catch (Exception)
            {

                result = false;
            }
            finally
            {
                con.Close();
            }
            return result;
        }
    }
}