using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace ShifttyMaps.Utility
{
    public class Common
    {
        //this function Convert to Encord your Password 
        public static string EncodePasswordToBase64(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }

        public static string DecodeFrom64(string encodedData)
        {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encodedData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }
        public static string SendRegistrationEmailNew(string firstName, string LastName,string Email, string Password)
        {
            string result = "true";
            try
            {

                string smtp_host = ConfigurationManager.AppSettings["smtp_host"].ToString();
                int smtp_port = Numerics.GetInt(ConfigurationManager.AppSettings["smtp_port"].ToString());
                string mail_sender = ConfigurationManager.AppSettings["mail_sender"].ToString();
                string smtp_email_acc = ConfigurationManager.AppSettings["smtp_email_acc"].ToString();
                string smtp_email_acc_pswrd = ConfigurationManager.AppSettings["smtp_email_acc_pswrd"].ToString();
                bool ssl = Convert.ToBoolean(ConfigurationManager.AppSettings["SSL"]);

                using (MailMessage mail = new MailMessage())
                {
                    string htmlString = @"<html>
                                        <body>
                                        <p>Dear "+firstName+"  "+LastName+" ,</p>";
                    htmlString += @"    <p>Your password is generated on the Shiftty Portal of Shiftty Maps. Please see the details below:</p>
                                        <ul>
                                        <li>Your password is " + Password+"</li>";
                    htmlString += @"    <li><a href='http://20.231.29.176/' >Please login here </a></li>
                                        </ul>
                                        <p>In case of any complaint / queries please feel free to send the email to " + smtp_email_acc + " </br></p> ";
                    htmlString += @"    <p>Thank you for your interest in the Shiftty Portal of Shiftty Maps. </br></p>
                                        <p>Best Regards,</br></p>
                                        <p>Shiftty Team</br></p>
                                        </body>
                                        </html> ";
                    mail.From = new MailAddress(smtp_email_acc);
                    mail.Subject = "Shiftty Maps - Your Password of Shiftty Portal";
                    mail.Body = htmlString;
                    mail.IsBodyHtml = true;
                    mail.To.Add(Email);
                    using (SmtpClient smtp = new SmtpClient(smtp_host, smtp_port))//2nd parameter is PORT No.
                    {
                        smtp.Credentials = new System.Net.NetworkCredential(smtp_email_acc, smtp_email_acc_pswrd);//supply userId & psd here
                        smtp.EnableSsl = true;//set this as your Host Name properties, for gmail,its true
                        smtp.Send(mail);//actual sending operation here
                    }
                }
                result = "Password sent";
               }
            catch (Exception ex)
            {
                result = ex.InnerException.ToString();
                //throw;
            }
            return result;
        }

    }
}