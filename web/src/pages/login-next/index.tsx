import SvgIcon from '@/components/svg-icon';
import { useAuth } from '@/hooks/auth-hooks';
import {
  useLogin,
  useLoginChannels,
  useLoginWithChannel,
  useRegister,
} from '@/hooks/use-login-request';
import { useSystemConfig } from '@/hooks/use-system-request';
import { rsaPsw } from '@/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, ButtonLoading } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FlipCard3D from './card';
import './index.less';

const Login = () => {
  const [title, setTitle] = useState('login');
  const navigate = useNavigate();
  const { login, loading: signLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();
  const { channels, loading: channelsLoading } = useLoginChannels();
  const { login: loginWithChannel, loading: loginWithChannelLoading } =
    useLoginWithChannel();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const [isLoginPage, setIsLoginPage] = useState(true);

  const loading =
    signLoading ||
    registerLoading ||
    channelsLoading ||
    loginWithChannelLoading;
  const { config } = useSystemConfig();
  const registerEnabled = config?.registerEnabled !== 0;

  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginWithChannel = async (channel: string) => {
    await loginWithChannel(channel);
  };

  const changeTitle = () => {
    setIsLoginPage(title !== 'login');
    if (title === 'login' && !registerEnabled) {
      return;
    }

    setTimeout(() => {
      setTitle(title === 'login' ? 'register' : 'login');
    }, 200);
  };

  const FormSchema = z
    .object({
      nickname: z.string(),
      email: z
        .string()
        .email()
        .min(1, { message: t('emailPlaceholder') }),
      password: z.string().min(1, { message: t('passwordPlaceholder') }),
      remember: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      if (title === 'register' && !data.nickname) {
        ctx.addIssue({
          path: ['nickname'],
          message: 'nicknamePlaceholder',
          code: z.ZodIssueCode.custom,
        });
      }
    });
  const form = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
    resolver: zodResolver(FormSchema),
  });

  const onCheck = async (params: z.infer<typeof FormSchema>) => {
    try {
      const rsaPassWord = rsaPsw(params.password) as string;

      if (title === 'login') {
        const code = await login({
          email: `${params.email}`.trim(),
          password: rsaPassWord,
        });
        if (code === 0) {
          navigate('/');
        }
      } else {
        const code = await register({
          nickname: params.nickname,
          email: params.email,
          password: rsaPassWord,
        });
        if (code === 0) {
          setTitle('login');
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <div className="modern-login-page">
      {/* Clean background */}
      <div className="modern-bg"></div>
      
      {/* Floating cards matching reference image */}
      <div className="floating-cards-wrapper">
        {/* Purple note - Call Editor */}
        <div className="floating-card-wrapper" style={{ top: '5%', left: '8%' }}>
          <div className="floating-card purple-note">
            <span>Call Editor</span>
          </div>
        </div>
        
        {/* Milton logo */}
        <div className="floating-card-wrapper" style={{ top: '3%', left: '35%' }}>
          <div className="floating-card logo-card">
            <span className="logo-icon">M</span>
            <span className="logo-text">Milton</span>
          </div>
        </div>
        
        {/* Yellow sticky note */}
        <div className="floating-card-wrapper" style={{ top: '5%', right: '5%' }}>
          <div className="floating-card yellow-sticky">
            <div className="sticky-title">Finish Paper</div>
            <div className="sticky-text">about women in finance</div>
          </div>
        </div>
        
        {/* Paper card - percentage */}
        <div className="floating-card-wrapper" style={{ top: '2%', left: '20%' }}>
          <div className="floating-card paper-card">
            <div className="paper-title">percentage</div>
            <div className="paper-excerpt">trading reduces men&apos;s net returns by 2.65 percentage points a year as opposed to..</div>
            <div className="paper-tags">
              <span className="tag empirical">● Empirical</span>
              <span className="tag theoretical">● Theoretical</span>
            </div>
          </div>
        </div>
        
        {/* Tag card - Overconfidence */}
        <div className="floating-card-wrapper" style={{ top: '15%', right: '15%' }}>
          <div className="floating-card tag-card">
            <span className="tag-indicator"></span>
            <span className="tag-name">Overconfidence</span>
          </div>
        </div>
        
        {/* Integrated paper */}
        <div className="floating-card-wrapper" style={{ top: '20%', right: '2%' }}>
          <div className="floating-card paper-card-small">
            <div className="paper-title-small">integrated</div>
            <div className="paper-excerpt-small">been employed to present a systematic..</div>
          </div>
        </div>
        
        {/* Blue note - Meet PhD Student */}
        <div className="floating-card-wrapper" style={{ bottom: '10%', left: '25%' }}>
          <div className="floating-card blue-note">
            <span>Meet PhD Student</span>
          </div>
        </div>
        
        {/* Paper large - Barber */}
        <div className="floating-card-wrapper" style={{ bottom: '15%', left: '2%' }}>
          <div className="floating-card paper-large">
            <div className="paper-header">Barber and Odean, 1998</div>
            <div className="paper-content">One of the most famous study on overconfidence in finance. Individual investors who trade more frequently earn..</div>
          </div>
        </div>
        
        {/* Paper large - Cain */}
        <div className="floating-card-wrapper" style={{ bottom: '20%', right: '2%' }}>
          <div className="floating-card paper-large">
            <div className="paper-header">Cain et al., 2015</div>
            <div className="paper-content">Revisit the classical question of overconfidence in market entry from</div>
          </div>
        </div>
        
        {/* Paper preview */}
        <div className="floating-card-wrapper" style={{ bottom: '5%', right: '15%' }}>
          <div className="floating-card paper-preview">
            <div className="preview-brand">Elsevier</div>
            <div className="preview-title">Overconfidence as a...</div>
            <div className="preview-author">Bill Proeger, Lukas Meys</div>
            <div className="preview-section">
              <div className="section-title">HIGHLIGHTS</div>
              <div className="section-line"></div>
              <div className="section-line short"></div>
              <div className="section-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Center login form */}
      <div className="login-center">
        <FlipCard3D isLoginPage={isLoginPage}>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-text-primary">
                  {title === 'login' ? t('loginTitle') : t('signUpTitle')}
                </h2>
              </div>
              <div className=" w-full max-w-[540px] bg-bg-component backdrop-blur-sm rounded-2xl shadow-xl pt-14 pl-10 pr-10 pb-2 border border-border-button ">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-8 text-text-primary "
                    onSubmit={form.handleSubmit(onCheck)}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>{t('emailLabel')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('emailPlaceholder')}
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {title === 'register' && (
                      <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>{t('nicknameLabel')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('nicknamePlaceholder')}
                                autoComplete="username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>{t('passwordLabel')}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={'password'}
                                placeholder={t('passwordPlaceholder')}
                                autoComplete={
                                  title === 'login'
                                    ? 'current-password'
                                    : 'new-password'
                                }
                                {...field}
                              />
                              {/* <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-500" />
                                )}
                              </button> */}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {title === 'login' && (
                      <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex gap-2">
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                  }}
                                />
                                <FormLabel
                                  className={cn(' hover:text-text-primary', {
                                    'text-text-disabled': !field.value,
                                    'text-text-primary': field.value,
                                  })}
                                >
                                  {t('rememberMe')}
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <ButtonLoading
                      type="submit"
                      loading={loading}
                      className="bg-metallic-gradient border-b-[#00BEB4] border-b-2 hover:bg-metallic-gradient hover:border-b-[#02bcdd] w-full my-8"
                    >
                      {title === 'login' ? t('login') : t('continue')}
                    </ButtonLoading>
                    {title === 'login' && channels && channels.length > 0 && (
                      <div className="mt-3 border">
                        {channels.map((item) => (
                          <Button
                            variant={'transparent'}
                            key={item.channel}
                            onClick={() => handleLoginWithChannel(item.channel)}
                            style={{ marginTop: 10 }}
                          >
                            <div className="flex items-center">
                              <SvgIcon
                                name={item.icon || 'sso'}
                                width={20}
                                height={20}
                                style={{ marginRight: 5 }}
                              />
                              Sign in with {item.display_name}
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </form>
                </Form>

                {title === 'login' && registerEnabled && (
                  <div className="mt-10 text-right">
                    <p className="text-text-disabled text-sm">
                      {t('signInTip')}
                      <Button
                        variant={'transparent'}
                        onClick={changeTitle}
                        className="text-accent-primary/90 hover:text-accent-primary hover:bg-transparent font-medium border-none transition-colors duration-200"
                      >
                        {t('signUp')}
                      </Button>
                    </p>
                  </div>
                )}
                {title === 'register' && (
                  <div className="mt-10 text-right">
                    <p className="text-text-disabled text-sm">
                      {t('signUpTip')}
                      <Button
                        variant={'transparent'}
                        onClick={changeTitle}
                        className="text-accent-primary/90 hover:text-accent-primary hover:bg-transparent font-medium border-none transition-colors duration-200"
                      >
                        {t('login')}
                      </Button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FlipCard3D>
        </div>
      </div>
    </div>
  );
};

export default Login;
