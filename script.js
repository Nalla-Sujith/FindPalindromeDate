var checkbutton=document.querySelector("#check-button")
var outputdiv=document.querySelector("#output-div");
var outputdiv2=document.querySelector("#output-div2");
var outputdiv3=document.querySelector("#output-div3");
var dateref=document.querySelector("#date-label")
var dateformats=["ddmmyy","ddmmyyyy","mmyydd","yymmdd","yyyymmdd"]
var generateallformats=(date)=>{
  var ddmmyy=date.day+date.month+date.year.slice(-2);
  var ddmmyyyy=date.day+date.month+date.year;
  var mmyydd=date.month+date.year.slice(-2)+date.day;
  var yymmdd=date.year.slice(-2)+date.month+date.day;
  var yyyymmdd=date.year+date.month+date.day;
  return [ddmmyy,ddmmyyyy,mmyydd,yymmdd,yyyymmdd];
}
var converttodateobj=(str)=>{
  var date={
  }
  var dd=str.split("-");
  date.day=dd[2];
  date.month=dd[1];
  date.year=dd[0];
  return date;
}
var ispalindrome=(text)=>{
  var local="";
  for(let i=text.length-1;i>=0;i--)
  {
    local+=text.charAt(i);
  }
  return local === text;
}
function clickhandler()
{
  var str=dateref.value
  let date=converttodateobj(str)
  let alldates=generateallformats(date)
  if(checkalldatespalindrome(alldates))
  {
    outputdiv.innerText="The Entered Date is a palindrome !!!"
    outputdiv2.style.display="none";
    outputdiv3.style.display="none";   
  }
  else
  {
    outputdiv2.style.display="block";
    outputdiv3.style.display="block";
     findnearestpalindrome(date);
  }
}
var findnearestpalindrome=(curdate)=>{
   date=nextdate(curdate);
   console.log("date is",curdate)
  let ans=0;
  while(true)
  {
    let date=nextdate(curdate);
    if(checkalldatespalindrome(generateallformats(date)))
    {
      console.log("Nearest Palindrome date is ",date);
      outputdiv.innerText="Next Near Palindrome Date is "+date.day+"-"+date.month+"-"+date.year;
      break;
    }
    ans++;
    curdate=date;
  }
  outputdiv2.innerText="It is of "+ans+" days far from Now!!!";
}
var isleapyear=(year)=>
{
    if(year%400==0)
    return true;
    if(year%100==0)
    return false;
    if(year%4==0)
    return true;
    return false;
}
var nextdate=(date)=>{
  days=Number(date.day);
  month=Number(date.month);
  year=Number(date.year);
  var daysinmonth=[31,28,31,30,31,30,31,31,30,31,30,31];
  days+=1;
  if(isleapyear(year))
  {
    daysinmonth[1]=29;
  }
  if(daysinmonth[month-1]<days)
  {
    days=1;
    month++;
    if(month === 13)
    month=1;
  }
  
  if(days==1 && month==1)
  year++;
  return {
    day:((days+"").length===1) ? ("0"+days) : days,
    month:((month+"").length===1) ? ("0"+month) : month+"",
    year:year+""
  }
}
function checkalldatespalindrome(alldates)
{
     for(let i=0;i<alldates.length;i++)
     {
      let text=alldates[i];
      if(ispalindrome(text))
      {
        outputdiv3.innerText="Format of Plaindrome is "+dateformats[i]+" => "+text;
        console.log("And the format is ",dateformats[i])
        console.log("Palindrom string format is",text)
        return true;
      }
     }
     return false;
}
checkbutton.addEventListener("click",clickhandler)