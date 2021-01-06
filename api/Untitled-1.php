<?php

require 'simple_html_dom.php';

$html = file_get_html('https://www.mycourseville.com/api/chulalogin');

$_token = $html->find('_token', 0);

echo $_token;
