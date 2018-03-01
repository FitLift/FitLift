#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <Wire.h>

// network information
const char * ssid = "What";
const char * password = "whysh0uldigiveittoyou";

// firebase database information
const char * host = "https://fitlift-38a0c.firebaseio.com";
const int httsPort = 443;

// fitLIFT user information
String fitLiftUser = "USER_1";
String postUrl = "/new_exercises/" + fitLiftUser + ".json";

// SHA1 fingerprint of the database browser's certificate
// chrome dev tools -> security -> view certificate -> details -> SHA1 fingerprint
String fingerprint = "B8 4F 40 70 0C 63 90 E0 07 E8 7D BD B4 11 D0 4A EA 9C 90 F6";

// timestamp variables
const char * timeHost = "http://api.timezonedb.com";
const char * timeGetUrl = "/v2/get-time-zone?format=json&key=M16RZS5PP1F9&by=zone&zone=America/Los_Angeles";

unsigned long timestamp = 0;              // stores time in seconds ( converted to milliseconds later )
unsigned long timestampOffset = 0;        // GMT offset

// MPU-6050 (accelerometer / gyroscope) variables
int16_t accelX, accelY, accelZ;           // raw data read from accelerometer
float gForceX, gForceY, gForceZ;          // scaled data for readability

int16_t gyroX, gyroY, gyroZ;              // raw data read from gyroscope
float rotX, rotY, rotZ;                   // scaled data for readability

// arduino time variables
unsigned long lastTime;
unsigned long currentTime;
unsigned long lastRecordedTime;

unsigned long printDelay = 250;           // 0.25 second delay for printing
unsigned long exerciseDelay = 800;        // 0.8 second delay before NEXT same exercise registered
unsigned long exerciseStopDelay = 5000;   // 5.0 seconds to halt after NO exercise registered
unsigned long erroneousDelay = 3500;      // 3.5 seconds to flush erroneous input

// exercise algorithm storage variables
int rep_count = 0;
float previousX = 0.0;
float previousZ = 0.0;
String exercise = "null";                 // current exercise in motion

void setup() 
{
    Serial.begin(115200);                       // serial connection

    // wifi network connection
    Serial.println("Connecting to " + String(ssid));
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED)       // wait for WIFI connection completion
    {  
        delay(1000);
        Serial.println("Waiting for connection.");
    }
    Serial.println("Connection successful!\n");
    
    // set time variables
    lastTime = millis();
    lastRecordedTime = lastTime;

    // MPU-6050 setup
    Wire.pins(0, 2);                            // Wire.pins(SDA, SCL)
    Wire.begin(0, 2);                           // initialize I2C communication
    setupMPU(); 
}

void loop() 
{
    // record accelerometer and gyroscope input
    recordGyroRegisters();
    recordAccelRegisters();

    currentTime = millis();
    if(currentTime >= lastTime + printDelay)
    {
        lastTime = currentTime;
    }

    if(currentTime >= lastRecordedTime + exerciseDelay)
    {
        // TRICEP EXTENSIONS
        if(rotX <= -50.0 && rotZ <= 10.0 && gForceX >= -0.5 && gForceY >= 0.0 && gForceZ >= 1.0)
        {
            // HANDLES ERRONEOUS SENSOR DETECTIONS
            if((exercise == "Lateral Raises" || exercise == "Bicep Curls") && rep_count == 2)
            {
                exercise = "Tricep Extensions";
                lastRecordedTime = currentTime;

                previousX = 0.0;
                previousZ = 0.0;

                Serial.print("    Current rep count: ");
                Serial.print(rep_count);
                Serial.println("    -----TRICEP EXTENSION-----"); 
            }
            // INCREMENT REP COUNT ON SUCCESSFUL MOTION
            else if(exercise == "null" || exercise == "Tricep Extensions")
            {
                rep_count++;
                exercise = "Tricep Extensions";
                lastRecordedTime = currentTime;

                Serial.print("    Current rep count: ");
                Serial.print(rep_count);
                Serial.println("    -----TRICEP EXTENSION-----"); 
            }
        }

        // BICEP CURLS
        else if((rotX <= 0.0 || rotX >= 5.0) && rotZ >= 75.0 && gForceX <= 0.1 && gForceY <= 1.0 && gForceZ <= 0.1)
        {
            // HANDLES ERRONEOUS SENSOR DETECTIONS
            if((exercise == "Lateral Raises" || exercise == "Tricep Extensions") && rep_count == 1)
            {
                exercise = "Bicep Curls";
                lastRecordedTime = currentTime;

                previousX = 0.0;
                previousZ = 0.0;

                Serial.print("Current rep count: ");
                Serial.print(rep_count);
                Serial.println("   -----BICEP CURL-----");
            }
            // INCREMENT REP COUNT ON SUCCESSFUL MOTION
            else if(exercise == "null" || exercise == "Bicep Curls")
            {
                rep_count++;
                exercise = "Bicep Curls";
                lastRecordedTime = currentTime;

                Serial.print("Current rep count: ");
                Serial.print(rep_count);
                Serial.println("   -----BICEP CURL-----");
            }
        }

        // LATERAL RAISES
        else if(previousX <= 0.0 && previousZ >= 50.0 && gForceX <= 0.1 && gForceY <= 0.1 && gForceZ <= 0.1)
        {
            // HANDLES ERRONEOUS SENSOR DETECTIONS
            // if((exercise == "Bicep Curls" || exercise == "Tricep Extensions") && rep_count == 1)
            if(exercise == "Tricep Extensions" && rep_count == 1)
            {
                exercise = "Lateral Raises";
                lastRecordedTime = currentTime;

                previousX = 0.0;
                previousZ = 0.0;
                
                Serial.print("Current rep count: ");
                Serial.print(rep_count);
                Serial.println("    -----LATERAL RAISE-----");
            }
            // INCREMENT REP COUNT ON SUCCESSFUL MOTION
            else if(exercise == "null" || exercise == "Lateral Raises")
            {
                rep_count++;
                exercise = "Lateral Raises";
                lastRecordedTime = currentTime;

                previousX = 0.0;
                previousZ = 0.0;

                Serial.print("Current rep count: ");
                Serial.print(rep_count);
                Serial.println("    -----LATERAL RAISE-----");
            }
        }

        // NO EXERCISE IN MOTION
        else
        {
            if(exercise == "null" || exercise == "Lateral Raises" || ((exercise == "Bicep Curls" || exercise == "Tricep Extensions") && rep_count == 1))
            {
                previousX = rotX;
                previousZ = rotZ; 
            }
        }
    }

    // HANDLES ERRONEOUS SENSOR DETECTIONS
    if((currentTime >= lastRecordedTime + erroneousDelay) && exercise != "null" && rep_count <= 3)
    {
        rep_count = 0;
        exercise = "null";

        Serial.println("Erroneous data detected and thrown out.");
    }

    // EXCEEDS TIMER COUNT AND RESETS
    if((currentTime >= lastRecordedTime + exerciseStopDelay) && exercise != "null")
    {
        Serial.print("Last recorded time: ");
        Serial.println(lastRecordedTime);
        Serial.println("Current exercise over, post and reset!");
        postData(exercise, rep_count);

        rep_count = 0;
        exercise = "null";
    }
}

// establish communication with MPU and setup all registers to read data
void setupMPU()
{
    Wire.beginTransmission(0b1101000);       // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
    Wire.write(0x6B);                        // accessing the register 6B ( power management )
    Wire.write(0b00000000);                  // setting the SLEEP register to 0
    Wire.endTransmission();               
  
    Wire.beginTransmission(0b1101000);       // the I2C address of the MPU 
    Wire.write(0x1B);                        // accessing the register 1B ( gyroscope configuration )
    Wire.write(0b00001000);                  // setting the gyro to full scale +/- 500 deg./s 
    Wire.endTransmission(); 
    
    Wire.beginTransmission(0b1101000);       // the I2C address of the MPU 
    Wire.write(0x1C);                        // accessing the register 1C ( accelerometer configuration )
    Wire.write(0b00000000);                  // setting the accel to +/- 2g
    Wire.endTransmission(); 
}

void recordAccelRegisters() 
{
    Wire.beginTransmission(0b1101000);    // the I2C address of the MPU
    Wire.write(0x3B);                     // starting register for accel readings
    Wire.endTransmission();

    Wire.requestFrom(0b1101000,6);        // request accel registers ( 3B - 40 )

    while(Wire.available() < 6);
    accelX = Wire.read()<<8|Wire.read();  // store first two bytes into accelX
    accelY = Wire.read()<<8|Wire.read();  // store middle two bytes into accelY
    accelZ = Wire.read()<<8|Wire.read();  // store last two bytes into accelZ

    processAccelData();
}

// scale raw data from accelerometer for readability
void processAccelData()
{   
    gForceX = accelX / 16384.0;
    gForceY = accelY / 16384.0; 
    gForceZ = accelZ / 16384.0;
}

void recordGyroRegisters() 
{
    Wire.beginTransmission(0b1101000);    // the I2C address of the MPU
    Wire.write(0x43);                     // starting register for gyro readings
    Wire.endTransmission();

    Wire.requestFrom(0b1101000,6);        // request gyro registers ( 43 - 48 )

    while(Wire.available() < 6);
    gyroX = Wire.read()<<8|Wire.read();  // store first two bytes into accelX
    gyroY = Wire.read()<<8|Wire.read();  // store middle two bytes into accelY
    gyroZ = Wire.read()<<8|Wire.read();  // store last two bytes into accelZ

    processGyroData();
}

// scale raw data from gyroscope for readability 
void processGyroData() 
{ 
    rotX = gyroX / 65.5;
    rotY = gyroY / 65.5;
    rotZ = gyroZ / 65.5;
}

void printData() 
{
    Serial.print("Gyro (deg):");
    Serial.print(" X=");
    Serial.print(rotX);
    Serial.print(" Y=");
    Serial.print(rotY);
    Serial.print(" Z=");
    Serial.print(rotZ);
  
    Serial.println();
  
    Serial.print("Accel (g):");
    Serial.print(" X=");
    Serial.print(gForceX);
    Serial.print(" Y=");
    Serial.print(gForceY);
    Serial.print(" Z=");
    Serial.println(gForceZ);
}

// POST exercise data to FIREBASE database
void postData(String exerciseType, int reps)
{
    // get timestamp from timezone API
    if (WiFi.status() == WL_CONNECTED)              // check wifi connection status
    { 
        HTTPClient http;                            // declare object of class HTTPClient
        int httpCode;

        String payload;
        char JSONmessageBuffer[300];
        StaticJsonBuffer<300> JSONbuffer;

        http.begin(String(timeHost) + String(timeGetUrl));
        httpCode = http.GET();
        payload = http.getString();

        if (httpCode == 200)                        // status = "OK" 
        {
            payload.toCharArray(JSONmessageBuffer, sizeof(JSONmessageBuffer));
            JsonObject& JSONencoderTime = JSONbuffer.parseObject(JSONmessageBuffer);

            timestamp = JSONencoderTime["timestamp"];
            timestampOffset = JSONencoderTime["gmtOffset"];
            timestamp -= timestampOffset;
        }
        else 
        {
            timestamp = 1577865600000;              // set time to January 1, 2020 12:00:00 AM by default, in seconds
        }
        http.end();                                 // close HTTP connection
    }
    else 
    {
        Serial.println("***Error in WiFi connection. Cannot GET timestamp from timezone API***");
    }
  
    // POST exercise data to database
    if (WiFi.status() == WL_CONNECTED)              // check WiFi connection status
    { 
        HTTPClient http;                            // declare object of class HTTPClient
        int httpCode;

        String payload;
        char JSONmessageBuffer[300];
        StaticJsonBuffer<300> JSONbuffer;

        String JSONdata = String("{\n") + 
                          String("  \"reps\": ") + String(reps) + String(",\n") +
                          String("  \"timeStamp\": ") + String(timestamp) + String("000,\n") +
                          String("  \"type\": \"") + String(exerciseType) + String("\"\n") +
                          String("}");
        Serial.println(JSONdata);

        http.begin(String(host) + String(postUrl), fingerprint);
        http.addHeader("Content-Type", "application/json");                // specify content-type header

        httpCode = http.POST(JSONdata);
        payload = http.getString();                                        // GET the response payload
        Serial.println(payload);                                           // print request response payload
        
        if (httpCode == 200)                                               // status = "OK" 
        {
            Serial.println("POST request success!\n");
        }
        else 
        {
            Serial.println("***POST request ERROR***");
        }
        http.end();                                                        // close HTTP connection
    }
    else 
    {
        Serial.println("***Error in WiFi connection. Cannot POST data to database***");
    }
}
