<?php
error_reporting(0);

$langs = array("af", "sq", "ar", "be", "bg", "ca", "zh-CN", "hr", "cs", "da", "nl", "et", "tl", "fi", "fr", "gl", "de", "el", "ht", "iw", "hi", "hu", "is", "id", "ga", "it", "ja", "ko", "lv", "lt", "mk", "ms", "mt", "no", "fa", "pl", "pt", "ro", "ru", "sr", "sk", "sl", "es", "sw", "sv", "th", "tr", "uk", "vi", "cy", "yi");

if($_POST['submit'] == 'Submit'){

  $lang = $_POST['lang'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $trans = stripslashes($_POST['trans']);
  if(in_array($lang, $langs) && strlen($name) <= 30 && preg_match('/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/', $email) && strlen($trans) > 1){
    $json = json_decode($trans, true);
    if(count($json) == 103){
      $valid = 'true';
      foreach($json as $js){
        if(!$js['message']){
          $valid = 'false';
          break;
        }
      }
      if($valid == 'true'){

        $filename = 'translations/'.$lang.'.'.urlencode(md5(date('U'))).'.json';
        $file = fopen($filename, 'w');
        fwrite($file, $trans);
        fclose($file);

        $to = 'info@indezinez.com';
        $subject = 'Recent History - Translation';
        $headers = "From: ".$email." <".$email.">\n";

        $message = "Recent History\n\n";
        $message .= "You've got a new translation.\n\n";
        $message .= "Name: ".$name."\n\n";
        $message .= "Translation: ".$filename;
        
        @mail($to, $subject, $message, $headers);
        
        $msg = '<p><strong style="color:green;">Thank you. We will review your translation before including it into the next release.</strong>.</p>';
        
      }else{
        $msg = '<p><strong style="color:red;">Translation validation failed</strong>.</p>';
      }
    }else{
      $msg = '<p><strong style="color:red;">Translation verification failed</strong>.</p>';
    }
  }else{
    $msg = '<p><strong style="color:red;">Please fill in all the fields correctly</strong>.</p>';
  }

}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Translations | Recent History</title>
<style type="text/css">

body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, Sans-serif;
  font-size: small;
}

</style>
</head>

<body>
<?php echo $msg; ?>
<form action="translations.php" method="post">
<strong>Language:</strong><br />
<select name="lang">
  <option <?php if($_POST['lang'] == 'af'){echo 'selected="selected"';} ?> value="af">Afrikaans</option>
  <option <?php if($_POST['lang'] == 'sq'){echo 'selected="selected"';} ?> value="sq">Albanian</option>
  <option <?php if($_POST['lang'] == 'ar'){echo 'selected="selected"';} ?> value="ar">Arabic</option>
  <option <?php if($_POST['lang'] == 'be'){echo 'selected="selected"';} ?> value="be">Belarusian</option>
  <option <?php if($_POST['lang'] == 'bg'){echo 'selected="selected"';} ?> value="bg">Bulgarian</option>
  <option <?php if($_POST['lang'] == 'ca'){echo 'selected="selected"';} ?> value="ca">Catalan</option>
  <option <?php if($_POST['lang'] == 'zh-CN'){echo 'selected="selected"';} ?> value="zh-CN">Chinese</option>
  <option <?php if($_POST['lang'] == 'hr'){echo 'selected="selected"';} ?> value="hr">Croatian</option>
  <option <?php if($_POST['lang'] == 'cs'){echo 'selected="selected"';} ?> value="cs">Czech</option>
  <option <?php if($_POST['lang'] == 'da'){echo 'selected="selected"';} ?> value="da">Danish</option>
  <option <?php if($_POST['lang'] == 'nl'){echo 'selected="selected"';} ?> value="nl">Dutch</option>
  <option <?php if($_POST['lang'] == 'et'){echo 'selected="selected"';} ?> value="et">Estonian</option>
  <option <?php if($_POST['lang'] == 'tl'){echo 'selected="selected"';} ?> value="tl">Filipino</option>
  <option <?php if($_POST['lang'] == 'fi'){echo 'selected="selected"';} ?> value="fi">Finnish</option>
  <option <?php if($_POST['lang'] == 'fr'){echo 'selected="selected"';} ?> value="fr">French</option>
  <option <?php if($_POST['lang'] == 'gl'){echo 'selected="selected"';} ?> value="gl">Galician</option>
  <option <?php if($_POST['lang'] == 'de'){echo 'selected="selected"';} ?> value="de">German</option>
  <option <?php if($_POST['lang'] == 'el'){echo 'selected="selected"';} ?> value="el">Greek</option>
  <option <?php if($_POST['lang'] == 'ht'){echo 'selected="selected"';} ?> value="ht">Haitian Creole</option>
  <option <?php if($_POST['lang'] == 'iw'){echo 'selected="selected"';} ?> value="iw">Hebrew</option>
  <option <?php if($_POST['lang'] == 'hi'){echo 'selected="selected"';} ?> value="hi">Hindi</option>
  <option <?php if($_POST['lang'] == 'hu'){echo 'selected="selected"';} ?> value="hu">Hungarian</option>
  <option <?php if($_POST['lang'] == 'is'){echo 'selected="selected"';} ?> value="is">Icelandic</option>
  <option <?php if($_POST['lang'] == 'id'){echo 'selected="selected"';} ?> value="id">Indonesian</option>
  <option <?php if($_POST['lang'] == 'ga'){echo 'selected="selected"';} ?> value="ga">Irish</option>
  <option <?php if($_POST['lang'] == 'it'){echo 'selected="selected"';} ?> value="it">Italian</option>
  <option <?php if($_POST['lang'] == 'ja'){echo 'selected="selected"';} ?> value="ja">Japanese</option>
  <option <?php if($_POST['lang'] == 'ko'){echo 'selected="selected"';} ?> value="ko">Korean</option>
  <option <?php if($_POST['lang'] == 'lv'){echo 'selected="selected"';} ?> value="lv">Latvian</option>
  <option <?php if($_POST['lang'] == 'lt'){echo 'selected="selected"';} ?> value="lt">Lithuanian</option>
  <option <?php if($_POST['lang'] == 'mk'){echo 'selected="selected"';} ?> value="mk">Macedonian</option>
  <option <?php if($_POST['lang'] == 'ms'){echo 'selected="selected"';} ?> value="ms">Malay</option>
  <option <?php if($_POST['lang'] == 'mt'){echo 'selected="selected"';} ?> value="mt">Maltese</option>
  <option <?php if($_POST['lang'] == 'no'){echo 'selected="selected"';} ?> value="no">Norwegian</option>
  <option <?php if($_POST['lang'] == 'fa'){echo 'selected="selected"';} ?> value="fa">Persian</option>
  <option <?php if($_POST['lang'] == 'pl'){echo 'selected="selected"';} ?> value="pl">Polish</option>
  <option <?php if($_POST['lang'] == 'pt'){echo 'selected="selected"';} ?> value="pt">Portuguese</option>
  <option <?php if($_POST['lang'] == 'ro'){echo 'selected="selected"';} ?> value="ro">Romanian</option>
  <option <?php if($_POST['lang'] == 'ru'){echo 'selected="selected"';} ?> value="ru">Russian</option>
  <option <?php if($_POST['lang'] == 'sr'){echo 'selected="selected"';} ?> value="sr">Serbian</option>
  <option <?php if($_POST['lang'] == 'sk'){echo 'selected="selected"';} ?> value="sk">Slovak</option>
  <option <?php if($_POST['lang'] == 'sl'){echo 'selected="selected"';} ?> value="sl">Slovenian</option>
  <option <?php if($_POST['lang'] == 'es'){echo 'selected="selected"';} ?> value="es">Spanish</option>
  <option <?php if($_POST['lang'] == 'sw'){echo 'selected="selected"';} ?> value="sw">Swahili</option>
  <option <?php if($_POST['lang'] == 'sv'){echo 'selected="selected"';} ?> value="sv">Swedish</option>
  <option <?php if($_POST['lang'] == 'th'){echo 'selected="selected"';} ?> value="th">Thai</option>
  <option <?php if($_POST['lang'] == 'tr'){echo 'selected="selected"';} ?> value="tr">Turkish</option>
  <option <?php if($_POST['lang'] == 'uk'){echo 'selected="selected"';} ?> value="uk">Ukrainian</option>
  <option <?php if($_POST['lang'] == 'vi'){echo 'selected="selected"';} ?> value="vi">Vietnamese</option>
  <option <?php if($_POST['lang'] == 'cy'){echo 'selected="selected"';} ?> value="cy">Welsh</option>
  <option <?php if($_POST['lang'] == 'yi'){echo 'selected="selected"';} ?> value="yi">Yiddish</option>
</select>
<br />
<br />
<label>
<strong>Name / Credit: (30 Chars Max)</strong><br />
<input style="width:200px;" type="text" name="name" value="<?php echo $_POST['name']; ?>" />
</label>
<br />
<br />
<label>
<strong>Email:</strong><br />
<input style="width:200px;" type="text" name="email" value="<?php echo $_POST['email']; ?>" />
</label>
<br />
<br />
<textarea rows="" cols="" style="width:754px; height:200px;" name="trans">
<?php
if(strlen($_POST['trans']) > 1):
  echo stripslashes($_POST['trans']);
else:
?>
{
  "recentHistory": {
    "message": "Recent History"
  },
  "recentlyClosedTabs": {
    "message": "Recently Closed Tabs"
  },
  "mostVisited": {
    "message": "Most Visited"
  },
  "recentBookmarks": {
    "message": "Recent Bookmarks"
  },
  "pinned": {
    "message": "Pinned"
  },
  "options": {
    "message": "Options"
  },
  "translations": {
    "message": "Translations"
  },
  "about": {
    "message": "About"
  },
  "mainOptions": {
    "message": "Main Options"
  },
  "styleOptions": {
    "message": "Style Options"
  },
  "advanceOptions": {
    "message": "Advance Options"
  },
  "option1": {
    "message": "Number of Recent History Items"
  },
  "option2": {
    "message": "Number of Recently Closed Tabs"
  },
  "option3": {
    "message": "Number of Most Visited Items"
  },
  "option4": {
    "message": "Number of Recently Bookmarked Items"
  },
  "option5": {
    "message": "Pop-up Order"
  },
  "option6": {
    "message": "History Page"
  },
  "option7": {
    "message": "Date Format"
  },
  "option8": {
    "message": "Show Search Bar in Pop-up"
  },
  "option9": {
    "message": "Preview"
  },
  "option10": {
    "message": "Show URL"
  },
  "option11": {
    "message": "Show Separator"
  },
  "option12": {
    "message": "Show Extra Info"
  },
  "option13": {
    "message": "Show Background Colours"
  },
  "option14": {
    "message": "Pop-up Icon"
  },
  "option15": {
    "message": "Pop-up Width"
  },
  "option16": {
    "message": "Restore Items to Most Visited"
  },
  "option17": {
    "message": "Filter Domains from Recent History"
  },
  "option18": {
    "message": "Left Mouse Click Action"
  },
  "option19": {
    "message": "Pop-up Theme"
  },
  "option20": {
    "message": "Time Format"
  },
  "option21": {
    "message": "Social Bookmarking"
  },
  "help1": {
    "message": "The number of recent history items in the pop-up"
  },
  "help2": {
    "message": "The number of recently closed tabs in the pop-up"
  },
  "help3": {
    "message": "The number of most visited items in the pop-up"
  },
  "help4": {
    "message": "The number of recently bookmarked items in the pop-up"
  },
  "help5": {
    "message": "The order in which the specified items will be shown"
  },
  "help6": {
    "message": "Which history manager you would like to use"
  },
  "help7": {
    "message": "The format of the date used throughout the extension"
  },
  "help8": {
    "message": "The search bar situated at the top of the pop-up"
  },
  "help10": {
    "message": "The page URL situated below the item title"
  },
  "help11": {
    "message": "The separator situated at the bottom of the item"
  },
  "help12": {
    "message": "The extra information next to the page URL (i.e. visit count and date)"
  },
  "help13": {
    "message": "If activated will display a different colour for different items such as a bookmarked or pinned URL in the recent history and recently closed tabs list"
  },
  "help16": {
    "message": "The URLs you have removed from the most visited list. Click on the cross next to the URL to restore it to the list."
  },
  "help17": {
    "message": "The URLs from the domain names you do not wish to be displayed in the recent history list, e.g. foobar.com"
  },
  "help18": {
    "message": "What should happen when you click on an item in the pop-up"
  },
  "help20": {
    "message": "The format of the time used throughout the extension"
  },
  "help21": {
    "message": "This adds a share icon next to items in the pop-up when editing"
  },
  "yes": {
    "message": "Yes"
  },
  "no": {
    "message": "No"
  },
  "visits": {
    "message": "Visits"
  },
  "saveOptions": {
    "message": "Save Options"
  },
  "saving": {
    "message": "Saving..."
  },
  "saved": {
    "message": "Saved!"
  },
  "click1": {
    "message": "Open in current tab"
  },
  "click2": {
    "message": "Open in new tab"
  },
  "click3": {
    "message": "Open in new background tab"
  },
  "translation1": {
    "message": "Please help make Recent History better by providing new and better translations for it. This page has been created to make it easier for you to translate this extension."
  },
  "translation2": {
    "message": "Please follow the steps below to translate Recent History into your language:"
  },
  "translation3": {
    "message": "Scroll to the bottom of this page."
  },
  "translation4": {
    "message": "Fill in the form correctly."
  },
  "translation5": {
    "message": "Translate all the 'messages' into your chosen language."
  },
  "translation6": {
    "message": "Click on the 'Submit' button."
  },
  "translation7": {
    "message": "Done!"
  },
  "aboutText": {
    "message": "This extension displays your recent history, recently closed tabs, most visited pages and recent bookmarks in a one click pop-up."
  },
  "successfullyInstalled": {
    "message": "Successfully Installed/Updated"
  },
  "whatsNew": {
    "message": "What's New?"
  },
  "version": {
    "message": "Version"
  },
  "showAllHistory": {
    "message": "Show All History"
  },
  "noResults": {
    "message": "No results found"
  },
  "currentHistory": {
    "message": "Current Date"
  },
  "allHistory": {
    "message": "All History"
  },
  "totalHistoryItems": {
    "message": "Total History Items:"
  },
  "deleteItems": {
    "message": "Delete Items"
  },
  "mondayLetter": {
    "message": "M"
  },
  "tuesdayLetter": {
    "message": "T"
  },
  "wednesdayLetter": {
    "message": "W"
  },
  "thursdayLetter": {
    "message": "T"
  },
  "fridayLetter": {
    "message": "F"
  },
  "saturdayLetter": {
    "message": "S"
  },
  "sundayLetter": {
    "message": "S"
  },
  "AM": {
    "message": "am"
  },
  "PM": {
    "message": "pm"
  },
  "12hour": {
    "message": "12 Hour"
  },
  "24hour": {
    "message": "24 Hour"
  },
  "loading": {
    "message": "Loading..."
  },
  "original": {
    "message": "Original"
  },
  "classic": {
    "message": "Classic"
  },
  "pink": {
    "message": "Pink"
  },
  "ui1": {
    "message": "Pin item?"
  },
  "ui2": {
    "message": "Delete item from history?"
  },
  "ui3": {
    "message": "Delete item from recently closed tabs?"
  },
  "ui4": {
    "message": "Delete bookmark?"
  },
  "ui5": {
    "message": "Delete item from the most visited list?"
  },
  "ui6": {
    "message": "Unpin?"
  },
  "tips": {
    "message": "Helpful Tips"
  },
  "tip1": {
    "message": "Pop-up: You can open an item in a new background tab by left clicking the item while pressing and holding down Ctrl."
  },
  "tip2": {
    "message": "Pop-up: By clicking on the cogs next to the titles you can delete, pin and share items."
  },
  "tip3": {
    "message": "Options: You can press the up and down keys to increase and decrease numerical values when the field is selected."
  },
  "tip4": {
    "message": "Options: You can press Enter to add a domain to the filtered list."
  },
  "tip5": {
    "message": "History: You can use Shift click to select multiple items."
  },
  "tip6": {
    "message": "History: Use the buttons in the blue toolbar to manipulate the way the history items are shown."
  }
}
<?php
endif;
?>
</textarea>
<br />
<br />
<input type="submit" name="submit" value="Submit" />
</form>
</body>

</html>