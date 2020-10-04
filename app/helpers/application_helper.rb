module ApplicationHelper
  def semantic_class_for flash_type
    { success: 'green', info: 'blue', error: 'red', warning: 'yellow' }[flash_type.to_sym]
  end

  def flash_messages(opts = {})
    flash.map do |msg_type, message|
      content_tag(:div, message, class: "ui #{semantic_class_for(msg_type)} message") do
        content_tag(:i, nil, class: 'close icon') + content_tag(:div, message, class: 'header')
      end
    end.join.html_safe
  end
end
