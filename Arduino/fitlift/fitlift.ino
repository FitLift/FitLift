/*
 * ACCELEROMETER ORIENTATIONS:
 * ---------------------------
 * 
 * Bicep Curls
 * - accelerometer on rightside
 * - INT pin facing up
 * 
 * Lateral raises
 * - accelerometer backside (behind person)
 * - INT pin facing up
 * 
 * Tricep extensions
 * - accelerometer facing down
 * - INT pin facing backside (behind person)
 */


#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <Wire.h>

// Network information
const char* ssid = "Twink";
const char* password = "dicksoutforharambe";

// Firebase database information
const char* host = "https://fitlift-38a0c.firebaseio.com";
const int httpsPort = 443;

// FitLift user information
String fitLiftUser = "SAMPLE_USER";
String postUrl = "/new_exercises/" + fitLiftUser + ".json";

// SHA1 fingerprint of the database browser's certificate
// Find out by using chrome dev tools -> security -> view certificate -> details -> SHA1 fingerprint
String fingerprint = "B8 4F 40 70 0C 63 90 E0 07 E8 7D BD B4 11 D0 4A EA 9C 90 F6";

// Timestamp variables
const char* timeHost = "http://api.timezonedb.com";
const char* timeGetUrl = "/v2/get-time-zone?format=json&key=M16RZS5PP1F9&by=zone&zone=America/Los_Angeles";
unsigned long timestamp = 0;    // only stores time in seconds, will be converted to milliseconds in code
unsigned long timestampOffset = 0;  // GMT offset

// MPU-6050 (accelerometer / gyroscope) variables
int16_t accelX, accelY, accelZ;
float gForceX, gForceY, gForceZ;

int16_t gyroX, gyroY, gyroZ;
float rotX, rotY, rotZ;

// Arduino time variables
unsigned long lastTime;
unsigned long currentTime;
unsigned long printDelay = 1000;  // time delay in milliseconds, for accelerometer printing purposes
unsigned long exerciseDelay = 800;        // 0.8 second delay before same exercise can be successfully registered
unsigned long exerciseStopDelay = 5000;  // 5 seconds for program to halt after no exercise has been registered
unsigned long lastRecordedExerciseTime;

void setup()
{
  Serial.begin(115200);   // Serial connection

  // Network connection
  Serial.println("Connecting to " + String(ssid));
  WiFi.begin(ssid, password);   //WiFi connection
  
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(1000);
    Serial.println("Waiting for connection");
  }
  
  Serial.println("Connection successful!\n");

  // Set time variables
  lastTime = millis();
  lastRecordedExerciseTime = lastTime;

  // MPU-6050 setup
  Wire.pins(0, 2);      // Wire.pins(SDA, SCL)
  Wire.begin(0, 2);
  setupMPU();
}

int rep_count = 0;

float previousX = 0.0;
float previousZ = 0.0;

String exercise = "null";

void loop()
{ 
  // Record accelerometer and gyroscope input
  recordAccelRegisters();
  recordGyroRegisters();

  currentTime = millis();
  if (currentTime >= lastTime + printDelay) {
      lastTime = currentTime;
//      printData();  // print accelerometer data
  }

  if (currentTime >= lastRecordedExerciseTime + exerciseDelay)
  {
    // DUMBBELL CURLS
    if ((rotX <= 0.0 || rotX >= 5.0) && rotZ >= 75.0 && gForceX <= 0.1 && gForceY <= 1.0 && gForceZ <= 0.1)
    {
      if ((exercise == "null" || exercise == "Bicep Curls"))
      {
        rep_count++;
        exercise = "Bicep Curls";
  
        lastRecordedExerciseTime = currentTime;
  
        Serial.print("Current rep count: ");
        Serial.print(rep_count);
        Serial.println("   -----BICEP CURL-----");
      }
    }
  
    // LATERAL RAISES
    else if (previousX <= 0.0 && previousZ >= 50.0 && gForceX <= 0.1 && gForceY <= 0.1 && gForceZ <= 0.1)
    {
      if (exercise == "null" || exercise == "Lateral Raises")
      {
        rep_count++;
        previousX = 0.0;
        previousZ = 0.0;
        exercise = "Lateral Raises";
  
        lastRecordedExerciseTime = currentTime;
  
        Serial.print("Current LATERAL rep count: ");
        Serial.print(rep_count);
        Serial.println("    -----LATERAL RAISE-----");
      }
    }

    // TRICEP EXTENSIONS
    else if(rotX <= -50.0 && rotZ <= 10.0)
    {
      if((exercise == "null" || exercise == "Tricep Extensions"))
      {
          rep_count++;
          exercise = "Tricep Extensions";

          lastRecordedExerciseTime = currentTime;
          
          Serial.print("Current TE rep count: ");
          Serial.print(rep_count);
          Serial.println("    -----TRICEP EXTENSION-----");
      }
    }
    else
    {
      if (exercise == "null" || exercise == "Lateral Raises")
      {
        previousX = rotX;
        previousZ = rotZ;
      }
    }
  
  }

  if ((currentTime >= lastRecordedExerciseTime + exerciseStopDelay)  && exercise != "null")
  {
    Serial.println("Current exercise over, post and reset.");
    postData(exercise, rep_count);
    rep_count = 0;
    exercise = "null";
  }
}

void setupMPU()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x6B);
  Wire.write(0b00000000);
  Wire.endTransmission();

  Wire.beginTransmission(0b1101000);
  Wire.write(0x1B);
  Wire.write(0b00001000);
  Wire.endTransmission();

  Wire.beginTransmission(0b1101000);
  Wire.write(0x1C);
  Wire.write(0b00000000);
  Wire.endTransmission();
}

void recordAccelRegisters()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x3B);
  Wire.endTransmission();

  Wire.requestFrom(0b1101000, 6);

  while (Wire.available() < 6);
  accelX = Wire.read() << 8 | Wire.read();
  accelY = Wire.read() << 8 | Wire.read();
  accelZ = Wire.read() << 8 | Wire.read();

  processAccelData();
}

void processAccelData()
{
  gForceX = accelX / 16384.0;
  gForceY = accelY / 16384.0;
  gForceZ = accelZ / 16384.0;
}

void recordGyroRegisters()
{
  Wire.beginTransmission(0b1101000);
  Wire.write(0x43);
  Wire.endTransmission();

  Wire.requestFrom(0b1101000, 6);

  while (Wire.available() < 6);
  gyroX = Wire.read() << 8 | Wire.read();
  gyroY = Wire.read() << 8 | Wire.read();
  gyroZ = Wire.read() << 8 | Wire.read();

  processGyroData();
}

void processGyroData()
{
  rotX = gyroX / 65.5;
  rotY = gyroY / 65.5;
  rotZ = gyroZ / 65.5;

  // rotX = gyroX / 131.0;
  // rotY = gyroY / 131.0;
  // rotZ = gyroZ / 131.0;
}

void printData()
{
  Serial.print("Gyro:");
  Serial.print(" X=");
  Serial.print(rotX);
  Serial.print(" Y=");
  Serial.print(rotY);
  Serial.print(" Z=");
  Serial.print(rotZ);

  Serial.println();

  Serial.print("Accel:");
  Serial.print(" X=");
  Serial.print(gForceX);
  Serial.print(" Y=");
  Serial.print(gForceY);
  Serial.print(" Z=");
  Serial.println(gForceZ);
}

// POST exercise data to Firebase database
void postData(String exerciseType, int reps) {
  // Get timestamp from timezone API
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient
    int httpCode;
    String payload;
    char JSONmessageBuffer[300];
    StaticJsonBuffer<300> JSONbuffer;

    http.begin(String(timeHost) + String(timeGetUrl));
    httpCode = http.GET();
    payload = http.getString();

    // status = "OK"
    if (httpCode == 200) {
      payload.toCharArray(JSONmessageBuffer, sizeof(JSONmessageBuffer));
      JsonObject& JSONencoderTime = JSONbuffer.parseObject(JSONmessageBuffer);
      timestamp = JSONencoderTime["timestamp"];
      timestampOffset = JSONencoderTime["gmtOffset"];
      timestamp -= timestampOffset;
    }
    else {
      // Set time to January 1, 2020 12:00:00 AM by default, in seconds
      timestamp = 1577865600000;
    }

    http.end();  //Close connection
  }
  else {
    Serial.println("***Error in WiFi connection. Cannot GET timestamp from timezone API***");
  }
  
  // Post exericse data to database
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient
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
    http.addHeader("Content-Type", "application/json");  //Specify content-type header

    httpCode = http.POST(JSONdata);
    payload = http.getString();                                        //Get the response payload
    Serial.println(payload);    //Print request response payload
    
    // status = "OK"
    if (httpCode == 200) {
      Serial.println("POST request success!\n");
    }
    else {
      Serial.println("***POST request ERROR***");
    }
 
    http.end();  //Close connection
  }
  else {
    Serial.println("***Error in WiFi connection. Cannot POST data to database***");
  }
}
