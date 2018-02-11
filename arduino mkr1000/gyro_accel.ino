#include <Wire.h>

// accelerometer: g-force exercised by earth
long accelX, accelY, accelZ;  // storing raw data from accelerometer
float gForceX, gForceY, gForceZ; // gravitational forces

// gyroscope: speed at which you rotate about certain axis
long gyroX, gyroY, gyroZ; // storing raw data from gyroscope
float rotX, rotY, rotZ; // rotational speed/velocity

int rep_count = 0;
int motion_count = 0;
float previous = 0;


void setup() 
{
  Serial.begin(9600); 
  Wire.begin(); // to initialize I2C communication
  setupMPU();
}

void loop() 
{
  recordAccelRegisters();
  recordGyroRegisters();
  printData();
  delay(500);
  
  if(previous >= 35.0 && gForceX <= 10.0)
  {
    rep_count++; 
    previous = 0;
    motion_count = 0;
  } else {
    previous = gForceX;
    motion_count++;
  }

  // Serial.print("Current rep count: ");
  // Serial.println(rep_count);
  
  // if(motion_count == 10)
  // {
  //   Serial.println("Post and reset rep count!");
  //   rep_count = 0;
  // }
  
  // If start doing different exercise, post and clear reps
  // Then start incrementing different workout reps
}

void setupMPU()
{
  // establish communication with MPU and setup all registers for reading from MPU
  
  Wire.beginTransmission(0b1101000); // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
  Wire.write(0x6B); // accessing the register 6B ( power management )
  Wire.write(0b00000000); // setting sleep register to 0 
  Wire.endTransmission();  
  
  Wire.beginTransmission(0b1101000); // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
  Wire.write(0x1B); // accessing the register 1B ( gyroscope configuration, FS_SEL[4:3] )
  Wire.write(0b00000000); // setting the gyro to full scale +/- 250 degree/s with sensitivity 131 ( FS_SEL = 0 )
                          //                                +/- 500 degree/s with sensitivity 65.5 ( FS_SEL = 1 )
                          //                                +/- 1000 degrees with sensitivity 32.8 ( FS_SEL = 2 )
                          //                                +/- 2000 degree/s with sensitivity 16.4 ( FS_SEL = 3 )
  Wire.endTransmission(); 
  
  Wire.beginTransmission(0b1101000); // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
  Wire.write(0x1C); // accessing the register 1C ( accelerometer configuration, AFS_SEL[4:3] )
  Wire.write(0b00000000); // setting the accel to +/- 2g with sensitivity 16384 ( AFS_SEL = 0 )
                          // setting the accel to +/- 4g with sensitivity 8192 ( AFS_SEL = 1 )
                          // setting the accel to +/- 8g with sensitivity 4096 ( AFS_SEL = 2 )
                          // setting the accel to +/- 16g with sensitivity 2048 ( AFS_SEL = 3 )                  
  Wire.endTransmission(); 
}

void recordAccelRegisters() 
{
  Wire.beginTransmission(0b1101000); // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
  Wire.write(0x3B); // starting register for accelerometer readings
  Wire.endTransmission();
  
  Wire.requestFrom(0b1101000, 6); // requesting accelerometer registers ( 3B - 40 )
  
  while(Wire.available() < 6);
    accelX = Wire.read() << 8|Wire.read(); // store first two bytes into accelX
    accelY = Wire.read() << 8|Wire.read(); // store middle two bytes into accelY
    accelZ = Wire.read() << 8|Wire.read(); // store last two bytes into accelZ
    
  processAccelData();
}

void processAccelData()
{
  // gForceX = accelX / 1455.0;
  // gForceY = accelY / 65000.0;
  // gForceZ = accelZ / 16900.0;
  
  // gForceX = accelX / 1072.0;
  // gForceY = accelY / 48806.0;
  // gForceZ = accelZ / 578.0;
  
  // gForceX = accelX;
  // gForceY = accelY;
  // gForceZ = accelZ;
  
  gForceX = accelX / 16384.0;
  gForceY = accelY / 16384.0; 
  gForceZ = accelZ / 16384.0;
  
}

void recordGyroRegisters() 
{
  Wire.beginTransmission(0b1101000); // the I2C address of the MPU ( b1101000/b1101001 for AC0 low/high )
  Wire.write(0x43); // starting register for gyroscope readings
  Wire.endTransmission();
  
  Wire.requestFrom(0b1101000,6); // request gyroscope registers ( 43 - 48 )
  
  while(Wire.available() < 6);
    gyroX = Wire.read() << 8|Wire.read(); // store first two bytes into accelX
    gyroY = Wire.read() << 8|Wire.read(); // store middle two bytes into accelY
    gyroZ = Wire.read() << 8|Wire.read(); // store last two bytes into accelZ
    
  processGyroData();
}

void processGyroData() 
{
  // rotX = gyroX / 65345.0;
  // rotY = gyroY / 65345.0;
  // rotZ = gyroZ / 65345.0;
  
  rotX = gyroX / 131.0;
  rotY = gyroY / 131.0; 
  rotZ = gyroZ / 131.0;
  
  // rotX = gyroX;
  // rotY = gyroY;
  // rotZ = gyroZ;
  
  // if(gyroZ > 100)
  // {
  //   rotZ = gyroZ / 65345.0;
  // } else {
  //   rotZ = gyroZ / 5.0;
  // }
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
  
  // Serial.println();
  
  Serial.print(" Accel (g):");
  Serial.print(" X=");
  Serial.print(gForceX);
  Serial.print(" Y=");
  Serial.print(gForceY);
  Serial.print(" Z=");
  Serial.println(gForceZ);
}
