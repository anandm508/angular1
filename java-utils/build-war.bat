rmdir calculator-war /s /q
mkdir "calculator-war/src/main/webapp/WEB-INF"
copy pom.xml calculator-war
copy web.xml calculator-war\src\main\webapp\WEB-INF
xcopy ..\app calculator-war\src\main\webapp /e
cd calculator-war
mvn clean install