rmdir 21_c /s /q
md 21_c
xcopy c:\Work\GitHub\Sandbox\BEM\validate-bem\package.json .\21_c\
xcopy c:\Work\GitHub\Sandbox\BEM\validate-bem\.htmlvalidate.json .\21_c\

xcopy c:\Work\GitHub\Sandbox\BEM\validate-bem\stylelint-plugins .\21_c\stylelint-plugins\ /E /I

if NOT ["%errorlevel%"]==["0"] (
   echo Error occured: errorlevel is %errorlevel%
   pause
   exit /b %errorlevel%
)
