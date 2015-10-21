<?php

class CustomSiteConfig extends DataExtension {

    private static $db = array(
        'AlertText' => 'HTMLText'
    );

    public function updateCMSFields(FieldList $fields) {
        $fields->addFieldToTab("Root.Main", 
            new HTMLEditorField("AlertText", "Alert Text")
        );
    }
}