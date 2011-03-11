module EngineyardThemeHelper
  def header(*args,&block)
    add_navigation = args[0] || 'true'
    add_js = args[1] || 'true'
    additional_header = block_given? ? capture(&block) : ''
    render :partial => 'engineyard-theme/header', :locals => {
      :additional_header => additional_header,
      :add_navigation => add_navigation,
      :add_js => add_js
    }
  end
  
  def footer(*args,&block)
    additional_footer = block_given? ? capture(&block) : ''
    add_navigation = args[0] || 'true'
    add_js = args[1] || 'true'
    render :partial => 'engineyard-theme/footer', :locals => {
      :additional_footer => additional_footer,
      :add_navigation => add_navigation,
      :add_js => add_js
    }
  end
end