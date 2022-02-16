makeall: mIndex mblogs mblogView mlogin msignup muser mwrite mauthor mprivacy mcontact github 

mIndex:
	htmlCreator/main.exe Index blogs 
mblogs:
	htmlCreator/main.exe blogs blogs 
mblogView:
	htmlCreator/main.exe blogView blogView 
mlogin:
	htmlCreator/main.exe login login nulll
msignup:
	htmlCreator/main.exe signup login nulllsignup
muser:
	htmlCreator/main.exe user user
mwrite:
	htmlCreator/main.exe write write
mauthor:
	htmlCreator/main.exe author author
mprivacy:
	htmlCreator/main.exe privacy privacy
mcontact:
	htmlCreator/main.exe contact contact

	








cr: delete compile run

delete:
	del htmlCreator\main.exe
compile:
	g++.exe -c htmlCreator/src/htmlCreator.cpp -o htmlCreator/src/obj/htmlCreator.o -std=c++17
	g++.exe -c htmlCreator/src/main.cpp -o htmlCreator/src/obj/main.o -std=c++17
	g++.exe htmlCreator/src/obj/main.o htmlCreator/src/obj/htmlCreator.o -o htmlCreator/main.exe -std=c++17
run: 
	.\htmlCreator\main.exe 

d: delete
c: compile
r: run


github:
	git add --all

	git commit -m "tamam"
	git push