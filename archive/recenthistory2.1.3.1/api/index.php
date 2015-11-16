<?php
error_reporting(0);
$ua = strtolower($_SERVER['HTTP_USER_AGENT']);

// Check if Chrome
if(stripos($ua, 'chrome') == false){
  header('HTTP/1.0 404 Not Found');
  exit;
}

// Accepted languages
$langs = array("af", "sq", "ar", "be", "bg", "ca", "zh-CN", "hr", "cs", "da", "nl", "et", "tl", "fi", "fr", "gl", "de", "el", "ht", "iw", "hi", "hu", "is", "id", "ga", "it", "ja", "ko", "lv", "lt", "mk", "ms", "mt", "no", "fa", "pl", "pt", "ro", "ru", "sr", "sk", "sl", "es", "sw", "sv", "th", "tr", "uk", "vi", "cy", "yi");

// Chosen language
if(strlen($_GET['l']) > 0){
  $slang = $_GET['l'];
}else{
  $slang = $_POST['lang'];
}

// Post form
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
        $subject = 'Recent History - Translation ('.$lang.')';
        $headers = "From: ".$email." <".$email.">\n";

        $message = "Recent History\n\n";
        $message .= "You've got a new translation.\n\n";
        $message .= "Name: ".$name."\n\n";
        $message .= "Translation: http://www.indezinez.com/api/ext/recenthistory/translations/".$filename;
        
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
  font-family: Arial, Helvetica, Sans-serif;
  font-size: small;
}

</style>
</head>

<body>
<p><img alt="Recent History" src="data:image/png;base64, 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" /></p>
<?php echo $msg; ?>
<form action="translations.php" method="post">
<strong>Language:</strong><br />
<select name="lang">
  <option <?php if($slang == 'af'){echo 'selected="selected"';} ?> value="af">Afrikaans</option>
  <option <?php if($slang == 'sq'){echo 'selected="selected"';} ?> value="sq">Shqiptar</option>
  <option <?php if($slang == 'ar'){echo 'selected="selected"';} ?> value="ar">اللغة العربية</option>
  <option <?php if($slang == 'be'){echo 'selected="selected"';} ?> value="be">Беларуская</option>
  <option <?php if($slang == 'bg'){echo 'selected="selected"';} ?> value="bg">български език</option>
  <option <?php if($slang == 'ca'){echo 'selected="selected"';} ?> value="ca">Català</option>
  <option <?php if($slang == 'zh-CN'){echo 'selected="selected"';} ?> value="zh-CN">中文</option>
  <option <?php if($slang == 'hr'){echo 'selected="selected"';} ?> value="hr">Hrvatski</option>
  <option <?php if($slang == 'cs'){echo 'selected="selected"';} ?> value="cs">Čeština</option>
  <option <?php if($slang == 'da'){echo 'selected="selected"';} ?> value="da">Dansk</option>
  <option <?php if($slang == 'nl'){echo 'selected="selected"';} ?> value="nl">Nederlands</option>
  <option <?php if($slang == 'et'){echo 'selected="selected"';} ?> value="et">Eesti</option>
  <option <?php if($slang == 'tl'){echo 'selected="selected"';} ?> value="tl">Filipino</option>
  <option <?php if($slang == 'fi'){echo 'selected="selected"';} ?> value="fi">Suomi</option>
  <option <?php if($slang == 'fr'){echo 'selected="selected"';} ?> value="fr">Français</option>
  <option <?php if($slang == 'gl'){echo 'selected="selected"';} ?> value="gl">Galego</option>
  <option <?php if($slang == 'de'){echo 'selected="selected"';} ?> value="de">Deutsch</option>
  <option <?php if($slang == 'el'){echo 'selected="selected"';} ?> value="el">Ελληνικά</option>
  <option <?php if($slang == 'ht'){echo 'selected="selected"';} ?> value="ht">Kreyòl ayisyen</option>
  <option <?php if($slang == 'iw'){echo 'selected="selected"';} ?> value="iw">עברית</option>
  <option <?php if($slang == 'hi'){echo 'selected="selected"';} ?> value="hi">हिन्दी</option>
  <option <?php if($slang == 'hu'){echo 'selected="selected"';} ?> value="hu">Magyar</option>
  <option <?php if($slang == 'is'){echo 'selected="selected"';} ?> value="is">Islenska</option>
  <option <?php if($slang == 'id'){echo 'selected="selected"';} ?> value="id">Bahasa Indonesia</option>
  <option <?php if($slang == 'ga'){echo 'selected="selected"';} ?> value="ga">Gaeilge</option>
  <option <?php if($slang == 'it'){echo 'selected="selected"';} ?> value="it">Italiano</option>
  <option <?php if($slang == 'ja'){echo 'selected="selected"';} ?> value="ja">日本語</option>
  <option <?php if($slang == 'ko'){echo 'selected="selected"';} ?> value="ko">한국어</option>
  <option <?php if($slang == 'lv'){echo 'selected="selected"';} ?> value="lv">Latviešu</option>
  <option <?php if($slang == 'lt'){echo 'selected="selected"';} ?> value="lt">Lietuvių</option>
  <option <?php if($slang == 'mk'){echo 'selected="selected"';} ?> value="mk">македонски</option>
  <option <?php if($slang == 'ms'){echo 'selected="selected"';} ?> value="ms">Bahasa Melayu</option>
  <option <?php if($slang == 'mt'){echo 'selected="selected"';} ?> value="mt">Malti</option>
  <option <?php if($slang == 'no'){echo 'selected="selected"';} ?> value="no">Norsk</option>
  <option <?php if($slang == 'fa'){echo 'selected="selected"';} ?> value="fa">فارسی</option>
  <option <?php if($slang == 'pl'){echo 'selected="selected"';} ?> value="pl">Polski</option>
  <option <?php if($slang == 'pt'){echo 'selected="selected"';} ?> value="pt">Português</option>
  <option <?php if($slang == 'ro'){echo 'selected="selected"';} ?> value="ro">Română</option>
  <option <?php if($slang == 'ru'){echo 'selected="selected"';} ?> value="ru">Русский</option>
  <option <?php if($slang == 'sr'){echo 'selected="selected"';} ?> value="sr">Српски</option>
  <option <?php if($slang == 'sk'){echo 'selected="selected"';} ?> value="sk">Slovenčina</option>
  <option <?php if($slang == 'sl'){echo 'selected="selected"';} ?> value="sl">Slovenščina</option>
  <option <?php if($slang == 'es'){echo 'selected="selected"';} ?> value="es">Español</option>
  <option <?php if($slang == 'sw'){echo 'selected="selected"';} ?> value="sw">Kiswahili</option>
  <option <?php if($slang == 'sv'){echo 'selected="selected"';} ?> value="sv">Svenska</option>
  <option <?php if($slang == 'th'){echo 'selected="selected"';} ?> value="th">ภาษาไทย</option>
  <option <?php if($slang == 'tr'){echo 'selected="selected"';} ?> value="tr">Türkçe</option>
  <option <?php if($slang == 'uk'){echo 'selected="selected"';} ?> value="uk">Українська</option>
  <option <?php if($slang == 'vi'){echo 'selected="selected"';} ?> value="vi">Tiếng Việt</option>
  <option <?php if($slang == 'cy'){echo 'selected="selected"';} ?> value="cy">Cymraeg</option>
  <option <?php if($slang == 'yi'){echo 'selected="selected"';} ?> value="yi">Yiddish</option>
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