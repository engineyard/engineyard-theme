module EngineyardThemeHelper
  def header(&block)
    additional_header = block_given? ? capture(&block) : ''
    render :partial => 'engineyard-theme/header', :locals => {
      :additional_header => additional_header
    }
  end
  
  def footer(&block)
    additional_footer = block_given? ? capture(&block) : ''
    render :partial => 'engineyard-theme/footer', :locals => {
      :additional_footer => additional_footer
    }
  end
end